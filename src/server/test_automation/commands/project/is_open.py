from ..mixin                   import CommandMixin, ProjectMixin
from instrument_server.command import Base

class IsOpen(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='is_project_open?')
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query for open project'

    def execute(self, received_command):
        args = self.args(received_command)
        return bool(self.project)

IS_COMMAND_PLUGIN = True
plugin            = IsOpen
