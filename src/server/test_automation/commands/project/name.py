from ..mixin                         import CommandMixin, ProjectMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin

class Name(ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='project_name?')
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query project name'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()
        if not 'name' in self.project:
            raise self.command_error("project missing 'name'")
        return self.project.procedure['name']

IS_COMMAND_PLUGIN = True
plugin            = Name
