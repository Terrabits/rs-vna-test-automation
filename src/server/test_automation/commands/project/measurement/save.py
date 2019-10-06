from   ...mixin                  import CommandMixin, CookiesMixin, ProjectMixin, VnaMixin
from   .measurement              import global_limit_for
from   instrument_server.command import Base
import json
import os
from   pathlib                   import Path

root_save_path = Path(os.path.expanduser('~')) / 'Documents' / 'TestAutomation'

class Save(CookiesMixin, VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='save_measurements', args={'path': None})
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)
        CookiesMixin.__init__(self, key='measurement', init_with={})

    @property
    def help_str(self):
        return 'Save current measurement results in <path>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        # You can't save if there are
        # unfinished steps!
        if None in self.cookies['results']['steps']:
            raise self.command_error('Unfinished steps, cannot save')

        # args
        path = args['path']

        # path
        save_path = root_save_path / self.cookies['serial_no']
        save_path.mkdir(parents=True, exist_ok=True)

        # calculate global pass/fail
        get_limit_str   = lambda i: i['limits']
        step_limit_strs = map(get_limit_str, self.cookies['results']['steps'])
        limit_str       = global_limit_for(step_limit_strs)
        self.cookies['results']['limits'] = limit_str

        # save
        filename = str(save_path / 'results.json')
        with open(filename, 'w') as f:
            json.dump(self.cookies['results'], f)

IS_COMMAND_PLUGIN = True
plugin            = Save
