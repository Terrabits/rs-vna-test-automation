from rohdeschwarz.instruments.vna import Vna
from socket import error, herror, gaierror, timeout

class VnaMixin(object):
    def __init__(self):
        assert self.command_error, 'VnaMixin requires CommandMixin!'
        if not 'vna' in self.devices:
            self.devices['vna'] = None
    @property
    def vna(self):
        return self.devices['vna']
    @vna.setter
    def vna(self, new_vna):
        self.devices['vna'] = new_vna
    def raise_if_not_vna(self):
        if not self.vna:
            raise self.command_error('VNA not connected')

    def connect_to_vna(self, address):
        self.disconnect_from_vna()
        try:
            vna = Vna()
            vna.open_tcp(address)
            if not vna.connected():
                raise self.command_error(f"cannot connect to '{address}'")
        except (error, herror, gaierror, timeout):
            raise self.command_error(f"socket error while connecting to '{address}'")
        except ConnectionError:
            raise self.command_error(f"connection error while connecting to '{address}'.")
        self.vna = vna
    def disconnect_from_vna(self):
        if not self.vna:
            return
        self.vna.local()
        self.vna.close()
        self.vna = None
