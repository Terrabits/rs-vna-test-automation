from ..mixin                         import CommandMixin, ProjectMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin
import os
from   pathlib import Path
from   ruamel  import yaml

class Open(ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='open_project', args={'filename': None})
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Open project:\n `open_project path/to/project/config.yaml`'

    def execute(self, received_command):
        args     = self.args(received_command)
        filename = os.path.expanduser(args['filename'])
        self.open(filename)

IS_COMMAND_PLUGIN = True
plugin            = Open
