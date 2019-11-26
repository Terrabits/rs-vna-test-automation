from ...mixin                  import CommandMixin, ProjectMixin, VnaMixin
from .save_paths               import SavePaths
from pathlib                   import Path
from instrument_server.command import Base


class Start(VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        CommandMixin.__init__(self, command='start_measurements_for', args={'serial_no': None, 'cal_group_name': None})
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Start measurements for device <serial_no>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        # args
        serial_no      = args['serial_no']
        cal_group_name = args['cal_group_name']

        # init state
        steps = len(self.project['measurements'])
        self.state['measurement']['serial_no']        = serial_no
        self.state['measurement']['cal_group_name']   = cal_group_name
        self.state['measurement']['results']          = {'serial_no': serial_no}
        self.state['measurement']['results']['steps'] = [None] * steps

        # paths
        root_path  = '~/Documents/TestAutomation'
        paths      = SavePaths(root_path, serial_no)
        paths.mkdir_p()
        self.state['measurement']['save_paths'] = paths

IS_COMMAND_PLUGIN = True
plugin            = Start
