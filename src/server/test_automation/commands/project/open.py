from   ..mixin                   import CommandMixin, ProjectMixin
from   instrument_server.command import Base
import os
from   pathlib                   import Path
from   ruamel                    import yaml

class Open(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='open_project', args={'filename': None})
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Open project:\n `open_project path/to/project/config.yaml`'

    def execute(self, received_command):
        args = self.args(received_command)
        if self.project:
            raise self.command_error('already a project open')

        # open project
        self.project = None
        filename = os.path.expanduser(args['filename'])
        with open(filename, 'r') as f:
            self.project             = yaml.safe_load(f.read())
            self.project['__file__'] = filename

IS_COMMAND_PLUGIN = True
plugin            = Open
