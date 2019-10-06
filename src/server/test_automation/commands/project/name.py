from ..mixin                   import CommandMixin, ProjectMixin
from instrument_server.command import Base

class Name(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='project_name?')
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query project name'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()
        if not 'name' in self.project:
            raise self.command_error("project missing 'name'")
        return self.project['name']

IS_COMMAND_PLUGIN = True
plugin            = Name
