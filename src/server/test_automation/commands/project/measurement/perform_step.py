from   .measurement import global_limit_for, limit_str_for_trace
from   .vna_patch   import nothing
from   ...mixin     import CommandMixin, ProjectMixin, SetupMixin, VnaMixin
from   instrument_server.command       import Base
from   instrument_server.command.mixin import ParserMixin
from   pathlib      import Path
import os

class PerformStep(SetupMixin, VnaMixin, ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='perform_measurement_step?', args={'index': int})
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)
        SetupMixin  .__init__(self)

    @property
    def help_str(self):
        return 'Perform measurement step <index>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()
        index      = args['index']
        if index < 0:
            raise self.command_error('index must be >= 0')
        steps = len(self.project.procedure['measurements'])
        if index >= steps:
            raise self.command_error(f'index must be < {steps}')

        # setup
        if 'setup' in self.project.procedure['measurements'][index]:
            filename = self.project.procedure['measurements'][index]['setup']
            self.apply_setup(filename)

        # cal group
        cal_group_name = self.state['measurement']['cal_group_name']
        if cal_group_name:
            for i in self.vna.channels:
                self.vna.channel(i).cal_group = cal_group_name
                self.vna.channel(i).dissolve_cal_group_link()

        # paths
        step_name = self.project.procedure['measurements'][index]['name']
        paths     = self.state['measurement']['save_paths']
        paths.mk_data_dir_p   (step_name)
        paths.mk_diagram_dir_p(step_name)

        # configure for sweeps
        self.vna.manual_sweep = True
        self.vna.timeout_ms   = 5*60*1000 # 5 mins ¯\_(ツ)_/¯

        # sweep channels
        # save results
        channel_results_list = []
        for channel in self.vna.channels:
            step_name = self.project.procedure['measurements'][index]['name']
            ch        = self.vna.channel(channel)
            ports     = ch.ports_used()
            if not ports:
                continue
            filename = paths.channel_filename_for(step_name, ch.name, len(ports))
            ch.save_measurement_locally(filename, ports)
            channel_results = {
                'name': ch.name,
                'data': {
                    'ports': ports,
                    'contents': 'touchstone file contents goes here'
                }
            }
            channel_results_list.append(channel_results)

        # save screenshot
        filename = paths.screenshot_filename_for(step_name, 'png')
        self.vna.save_screenshot_locally(filename, 'PNG')

        # process diagrams
        is_only_one_diagram  = len(self.vna.diagrams) == 1
        diagram_results_list = []
        diagram_limit_strs   = []
        for diagram in self.vna.diagrams:
            d = self.vna.diagram(diagram)

            # edit by department of redundancy department
            if not is_only_one_diagram:
                title    = d.title or f'diagram {diagram}'
                filename = paths.diagram_filename_for(step_name, title, 'png')
                d.save_screenshot_locally(filename, 'PNG')

            # save traces
            trace_results_list  = []
            trace_limit_strs    = []
            for trace in d.traces:
                t         = self.vna.trace(trace)
                filename  = paths.trace_filename_for(step_name, t.name)
                t.save_data_locally(filename)
                limit_str = limit_str_for_trace(t)
                trace_limit_strs.append(limit_str)
                results       = {
                    'name':      t.name,
                    'parameter': str(t.parameter),
                    'format':    str(t.format),
                    'limits':    limit_str
                };
                trace_results_list.append(results)

            # save diagram
            limit_str = global_limit_for(trace_limit_strs)
            results   = {
                'title':  d.title,
                'screenshot': {
                    'type':     'PNG',
                    'contents': 'base64 goes here'
                },
                'traces': trace_results_list,
                'limits': limit_str
            };
            diagram_results_list.append(results);
            diagram_limit_strs  .append(limit_str)

        # step results
        limit_str = global_limit_for(diagram_limit_strs)
        results = {
            'screenshot': {
                'type':     'PNG',
                'contents': 'base64 goes here'
            },
            'limits':    limit_str,
            'channels':  channel_results_list,
            'diagrams':  diagram_results_list
        }
        self.state['measurement']['results']['steps'][index] = results
        return True

IS_COMMAND_PLUGIN = True
plugin            = PerformStep
