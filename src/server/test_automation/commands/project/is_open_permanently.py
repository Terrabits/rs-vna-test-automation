from   ..mixin                   import CommandMixin, ProjectMixin
from   instrument_server.command import Base
import os
from   pathlib                   import Path
from   ruamel                    import yaml

class IsOpenPermanently(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='is_project_open_permanently?')
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query if project is open permanently.'

    def execute(self, received_command):
        args = self.args(received_command)
        return self.is_permanent_project

IS_COMMAND_PLUGIN = True
plugin            = IsOpenPermanently
