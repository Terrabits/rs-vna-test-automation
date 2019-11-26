from ...mixin                        import CommandMixin, ProjectMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin

class Steps(ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='measurement_steps?')
        CommandMixin.__init__(self)
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
