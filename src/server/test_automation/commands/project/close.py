from ..mixin                      import CommandMixin, ProjectMixin
from instrument_server.command    import Base

class Close(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='close_project')
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Close project'

    def execute(self, received_command):
        args = self.args(received_command)
        self.close()

IS_COMMAND_PLUGIN = True
plugin            = Close
