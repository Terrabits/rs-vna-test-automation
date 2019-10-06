from   ...mixin                  import CommandMixin, CookiesMixin, ProjectMixin, VnaMixin
from   .measurement              import global_limit_for
from   instrument_server.command import Base

class Passed(CookiesMixin, VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='measurements_passed?')
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

        # You can't pass if there are
        # unfinished steps!
        if None in self.cookies['results']['steps']:
            raise self.command_error('Unfinished steps, cannot pass/fail yet')

        # limits for each step
        get_limit_str   = lambda i: i['limits']
        step_limit_strs = map(get_limit_str, self.cookies['results']['steps'])

        # global limit?
        return global_limit_for(step_limit_strs) != 'failed'

IS_COMMAND_PLUGIN = True
plugin            = Passed
