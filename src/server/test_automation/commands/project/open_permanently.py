from   ..mixin                   import CommandMixin, ProjectMixin
from   instrument_server.command import Base
import os
from   pathlib                   import Path
from   ruamel                    import yaml

class OpenPermanently(ProjectMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ProjectMixin.__init__(self)
        if 'filename' in self.settings:
            filename = self.settings['filename']
            self.open_permanently(filename)

    @property
    def help_str(self):
        return 'Opens project permanently if filename is provided as a command plugin setting.'

IS_COMMAND_PLUGIN = True
plugin            = OpenPermanently
