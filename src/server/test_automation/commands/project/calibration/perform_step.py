from   .calibration              import num_steps, port_map_for_step_str
from   ...mixin                  import CommandMixin, ProjectMixin, VnaMixin
from   instrument_server.command import Base
import socket

class PerformStep(VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='perform_calibration_step?', args={'index': int})
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Perform calibration step <index>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()
        index = args['index']
        if index < 0:
            raise self.command_error("index must be >= 0")
        ports              = self.project['calibration']['ports']
        num_cal_unit_ports = self.vna.cal_unit().ports
        steps              = num_steps(ports, num_cal_unit_ports)
        if index > steps:
            raise self.command_error(f"index must be <= {steps}")

        channel      = 1
        timeout_ms     = 5*60*1000 # 5 mins ¯\_(ツ)_/¯

        # acquire
        assignment = index + 1
        self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:ASS{assignment}:ACQ")
        try:
            return self.vna.pause(timeout_ms)
        except socket.timeout:
            raise self.command_error('timeout')

IS_COMMAND_PLUGIN = True
plugin            = PerformStep
