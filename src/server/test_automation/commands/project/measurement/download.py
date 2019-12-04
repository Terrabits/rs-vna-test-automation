from   .measurement  import global_limit_for
from   ...block_data import to_block_data_format
from   ...mixin      import CommandMixin, ProjectMixin
from   instrument_server.command       import Base
from   instrument_server.command.mixin import ParserMixin
import json

class Download(ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='download_measurement_results?')
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Download current measurement results zip'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()

        # You can't download if there are
        # unfinished steps!
        if None in self.state['measurement']['results']['steps']:
            raise self.command_error('Unfinished steps, cannot download')

        # paths
        paths = self.state['measurement']['save_paths']

        # calculate global pass/fail
        get_limit_str   = lambda i: i['limits']
        step_limit_strs = map(get_limit_str, self.state['measurement']['results']['steps'])
        limit_str       = global_limit_for(step_limit_strs)
        self.state['measurement']['results']['limits'] = limit_str
        paths.write_global_limit(limit_str)

        # save summary json
        filename = paths.summary_json_filename()
        with open(filename, 'w') as f:
            json.dump(self.state['measurement']['results'], f)

        # create/update zip
        paths.zip()

        # read and return data
        try:
            with open(paths.zip_filename, 'rb') as f:
                data = f.read()
        except:
            raise self.command_error('Problem generating or reading results file', received_command)
        return to_block_data_format(data)


IS_COMMAND_PLUGIN = True
plugin            = Download
