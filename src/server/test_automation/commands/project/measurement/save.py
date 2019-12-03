from   .measurement import global_limit_for
from   ...mixin     import CommandMixin, ProjectMixin, VnaMixin
from   instrument_server.command       import Base
from   instrument_server.command.mixin import ParserMixin
import json
import os
from   pathlib import Path

class Save(VnaMixin, ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='save_measurements')
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Save current measurement results in <path>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        # You can't save if there are
        # unfinished steps!
        if None in self.state['measurement']['results']['steps']:
            raise self.command_error('Unfinished steps, cannot save')

        # paths
        paths = self.state['measurement']['save_paths']

        # calculate global pass/fail
        get_limit_str   = lambda i: i['limits']
        step_limit_strs = map(get_limit_str, self.state['measurement']['results']['steps'])
        limit_str       = global_limit_for(step_limit_strs)
        self.state['measurement']['results']['limits'] = limit_str
        paths.write_global_limit(limit_str)

        # save
        filename = paths.summary_json_filename()
        with open(filename, 'w') as f:
            json.dump(self.state['measurement']['results'], f)

IS_COMMAND_PLUGIN = True
plugin            = Save
