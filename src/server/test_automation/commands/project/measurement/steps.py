from ...mixin                  import CommandMixin, ProjectMixin
from instrument_server.command import Base

class Steps(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='measurement_steps?')
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query number of measurement steps'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()
        return len(self.project['measurements'])

IS_COMMAND_PLUGIN = True
plugin            = Steps