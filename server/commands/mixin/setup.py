from instrument_server.command import CommandError

class SetupMixin(object):
    def apply_setup(self, filename):
        if filename.lower().endswith('.scpi'):
            self._apply_scpi_file(filename)
        else:
            self._apply_set_file(filename)

    def _apply_set_file(self, filename):
        raise NotImplementedError('Non-scpi setups not yet supported.')
    def _apply_scpi_file(self, filename):
        self.vna.is_error()
        self.vna.clear_status()
        self.vna.preset()
        self.vna.pause()
        with open(filename, 'r') as f:
            for i, line in enumerate(f):
                line = line.strip()
                if not line or line.startswith('#'):
                    # emtpy line or comment
                    continue
                if line.endswith('?'):
                    self.vna.query(line)
                else:
                    self.vna.write(line)
                if self.vna.is_error():
                    self.vna.clear_status()
                    raise self.command_error(f"SCPI Error in '{filename}' on line {i}: '{line}'")
