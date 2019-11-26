from ..mixin                         import CommandMixin, ProjectMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin

class IsOpen(ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='is_project_open?')
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query for open project'

    def execute(self, received_command):
        args = self.args(received_command)
        return self.is_project

IS_COMMAND_PLUGIN = True
plugin            = IsOpen
