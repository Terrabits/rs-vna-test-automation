from .calibration                    import num_steps
from ...mixin                        import CommandMixin, ProjectMixin, VnaMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin

class Steps(VnaMixin, ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='calibration_steps?')
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Query number of calibration steps'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        ports              = self.project['calibration']['ports']
        num_cal_unit_ports = self.vna.cal_unit().ports
        return num_steps(ports, num_cal_unit_ports)

IS_COMMAND_PLUGIN = True
plugin            = Steps
