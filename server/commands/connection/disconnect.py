from ..mixin                   import CommandMixin, VnaMixin
from instrument_server.command import Base

class Disconnect(VnaMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='disconnect_from_vna')
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Disconnects VNA'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.vna.local()
        self.vna.close()
        self.vna = None

IS_COMMAND_PLUGIN = True
plugin            = Disconnect
