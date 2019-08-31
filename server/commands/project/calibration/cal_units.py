from ...mixin                     import CommandMixin, VnaMixin
from instrument_server.command    import Base

class CalUnits(VnaMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='cal_units?')
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Query available cal units'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        return ",".join(self.vna.cal_units)

IS_COMMAND_PLUGIN = True
plugin            = CalUnits
