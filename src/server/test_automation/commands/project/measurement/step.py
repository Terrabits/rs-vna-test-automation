from   ...mixin                  import CommandMixin, ProjectMixin
from   instrument_server.command import Base
import json

class Step(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='measurement_step?', args={'index': int})
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
        steps = len(self.project['measurements'])
        if index >= steps:
            raise self.command_error(f"index must be < {steps}")

        return json.dumps(self.project['measurements'][index]['connections'])

IS_COMMAND_PLUGIN = True
plugin            = Step
