from   ...mixin                        import CommandMixin, ProjectMixin
from   instrument_server.command       import Base
from   instrument_server.command.mixin import ParserMixin
import json

class Step(ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='measurement_step?', args={'index': int})
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query info for measurement step <i>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()
        index = args['index']
        if index < 0:
            raise self.command_error("index must be >= 0")
        steps = len(self.project.procedure['measurements'])
        if index >= steps:
            raise self.command_error(f"index must be < {steps}")

        return json.dumps(self.project.procedure['measurements'][index])

IS_COMMAND_PLUGIN = True
plugin            = Step
