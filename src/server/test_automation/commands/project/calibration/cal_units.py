from ...mixin                        import CommandMixin, VnaMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin

class CalUnits(VnaMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='cal_units?')
        CommandMixin.__init__(self)
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
