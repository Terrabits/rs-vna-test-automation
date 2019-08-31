from .calibration              import num_steps
from ...mixin                  import CommandMixin, ProjectMixin, VnaMixin
from instrument_server.command import Base

class Steps(VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='calibration_steps?')
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
