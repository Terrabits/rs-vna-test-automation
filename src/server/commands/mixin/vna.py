class VnaMixin(object):
    def __init__(self):
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
