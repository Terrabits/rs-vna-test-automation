from ...mixin                  import CommandMixin, CookiesMixin, ProjectMixin, VnaMixin
from pathlib                   import Path
from instrument_server.command import Base

class Save(CookiesMixin, VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='save_measurements', args={'path': None})
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)
        CookiesMixin.__init__(self, key='measurement', init_with={})

    @property
    def help_str(self):
        return 'Save current measurement results in <path>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        # args
        path = args['path']

        # TODO:
        # process self.cookies['results']
        raise NotImplementedError('save_measurements is not implemented.')

IS_COMMAND_PLUGIN = True
plugin            = Save
