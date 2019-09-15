from ..mixin                   import CommandMixin, VnaMixin
from instrument_server.command import Base

class IsConnected(VnaMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='is_vna_connected?')
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Query VNA connection status'

    def execute(self, received_command):
        args = self.args(received_command)
        return bool(self.vna and self.vna.connected())

IS_COMMAND_PLUGIN = True
plugin            = IsConnected
