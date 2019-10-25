from ..mixin                   import CommandMixin, ProjectMixin
from instrument_server.command import Base

class Version(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='project_version?')
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query project version'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()
        if not 'version' in self.project:
            raise self.command_error("project missing 'version'")
        return self.project['version']

IS_COMMAND_PLUGIN = True
plugin            = Version
