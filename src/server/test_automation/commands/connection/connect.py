from ..mixin                         import CommandMixin, VnaMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin
from rohdeschwarz.instruments.vna    import Vna
from socket import error, herror, gaierror, timeout

class Connect(VnaMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='connect_to_vna', args={'address': None})
        CommandMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Connects to R&S VNA:\n `connect <ip_address>`'

    def execute(self, received_command):
        args = self.args(received_command)
        if self.vna:
            raise self.command_error('connection already present')
        address = args['address']
        self.connect_to_vna(address)

IS_COMMAND_PLUGIN = True
plugin            = Connect
