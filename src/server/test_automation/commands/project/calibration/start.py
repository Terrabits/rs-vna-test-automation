from .calibration              import num_steps, port_map_for_step_str
from ...mixin                  import CommandMixin, ProjectMixin, SetupMixin, VnaMixin
from pathlib                   import Path
from instrument_server.command import Base

class Start(SetupMixin, VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        CommandMixin.__init__(self, command='start_calibration')
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)
        SetupMixin  .__init__(self)

    @property
    def help_str(self):
        return 'Start calibration'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        channel = 1

        # setup
        if 'setup' in self.project['calibration']:
            filename  = self.project['calibration']['setup']
            self.apply_setup(str(self.project_root_path / filename))

        # Clear previously defined cal
        self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:ASS:DEL:ALL")

        # Use UOSM with factory cal
        self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:CONF FNP,''")

        # Define each step
        ports              = self.project['calibration']['ports']
        num_cal_unit_ports = self.vna.cal_unit().ports
        for i in range(0, num_steps(ports, num_cal_unit_ports)):
            assignment = i + 1
            port_str = port_map_for_step_str(ports, num_cal_unit_ports, i)
            self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:ASS{assignment}:DEF {port_str}")

IS_COMMAND_PLUGIN = True
plugin            = Start
