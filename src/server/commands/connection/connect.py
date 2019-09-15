from ..mixin                      import CommandMixin, VnaMixin
from instrument_server.command    import Base
from rohdeschwarz.instruments.vna import Vna

class Connect(VnaMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='connect_to_vna', args={'address': None})
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Connects to R&S VNA:\n `connect <ip_address>`'

    def execute(self, received_command):
        args = self.args(received_command)
        if self.vna:
            raise self.command_error('connection already present')
        address = args['address']

        # connect
        self.vna = None
        try:
            vna = Vna()
            vna.open_tcp(address)
            if not vna.connected():
                raise self.command_error(f"cannot connect to '{address}'")
        except ConnectionError:
            raise self.command_error(f"connection error while connecting to '{address}'.")
        self.vna = vna

IS_COMMAND_PLUGIN = True
plugin            = Connect
