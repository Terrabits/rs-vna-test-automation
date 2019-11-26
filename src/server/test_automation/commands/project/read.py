from   ..mixin                      import CommandMixin, ProjectMixin
from   instrument_server.command    import Base
import json

class Read(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        CommandMixin.__init__(self, command='read_project?')
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Read project file contents in JSON format'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()
        return json.dumps(self.project).encode()

IS_COMMAND_PLUGIN = True
plugin            = Read
