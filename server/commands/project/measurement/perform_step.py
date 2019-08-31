from ...mixin                  import CommandMixin, CookiesMixin, ProjectMixin, SetupMixin, VnaMixin
from pathlib                   import Path
from instrument_server.command import Base

class PerformStep(CookiesMixin, SetupMixin, VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='perform_measurement_step?', args={'index': int})
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)
        SetupMixin  .__init__(self)
        CookiesMixin.__init__(self, key='measurement', init_with={})

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
        steps = len(self.project['measurements'])
        if index >= steps:
            raise self.command_error(f'index must be < {steps}')

        # setup
        if 'setup' in self.project['measurements'][index]:
            filename = self.project['measurements'][index]['setup']
            self.apply_setup(str(self.project_root_path / filename))

        # cal group
        cal_group_name = self.cookies['cal_group_name']
        if cal_group_name:
            for i in self.vna.channels:
                self.vna.channel(i).cal_group = cal_group_name
                self.vna.channel(i).dissolve_cal_group_link()

        # sweep
        timeout_ms = 5*60*1000 # 5 mins ¯\_(ツ)_/¯
        self.vna.manual_sweep = True
        self.vna.start_sweeps()
        self.vna.pause(timeout_ms)

        results = {}
        # limits: passed|failed
        results['channels'] = []
        for channel in self.vna.channels:
            results['channels'].append({})
            # name:
            # data:
            #   ports: 4
            #   contents: b''

        results['diagrams'] = []
        for diagram in self.vna.diagrams:
            results['diagrams'].append({})
            # title:
            # screenshot:
            #   type: PNG
            #   contents: ""
            # limits: passed|failed
            results['diagrams'][-1]['traces'] = []
            for trace in self.vna.diagram(diagram).traces:
                results['diagrams'][-1]['traces'].append([])
                # results['diagrams'][-1]['traces'][-1]
                #
        self.cookies['results']['steps'][index] = results

        return True

IS_COMMAND_PLUGIN = True
plugin            = PerformStep
