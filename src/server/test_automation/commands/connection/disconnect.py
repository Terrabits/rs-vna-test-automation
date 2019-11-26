from ..mixin                         import CommandMixin, VnaMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin

class Disconnect(VnaMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='disconnect_from_vna')
        CommandMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Disconnects VNA'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.disconnect_from_vna()

IS_COMMAND_PLUGIN = True
plugin            = Disconnect
