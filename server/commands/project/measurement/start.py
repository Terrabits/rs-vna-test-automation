from ...mixin                  import CommandMixin, CookiesMixin, ProjectMixin, VnaMixin
from pathlib                   import Path
from instrument_server.command import Base

class Start(CookiesMixin, VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='start_measurements_for', args={'serial_no': None, 'cal_group_name': None})
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)
        CookiesMixin.__init__(self, key='measurement', init_with={})

    @property
    def help_str(self):
        return 'Start measurements for device <serial_no>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        # args
        cal_group_name = args['cal_group_name'].replace("'", '')
        serial_no = args['serial_no'].replace("'", '')

        # init cookies
        steps = len(self.project['measurements'])
        self.cookies['cal_group_name']   = cal_group_name
        self.cookies['results']          = {'serial_no': serial_no}
        self.cookies['results']['steps'] = [None] * steps

IS_COMMAND_PLUGIN = True
plugin            = Start
