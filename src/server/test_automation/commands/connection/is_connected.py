from ..mixin                         import CommandMixin, VnaMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin

class IsConnected(VnaMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='is_vna_connected?')
        CommandMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Query VNA connection status'

    def execute(self, received_command):
        args = self.args(received_command)
        return bool(self.vna and self.vna.connected())

IS_COMMAND_PLUGIN = True
plugin            = IsConnected
