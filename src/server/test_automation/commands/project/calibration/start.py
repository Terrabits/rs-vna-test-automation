from .calibration                    import num_steps, port_map_for_step_str
from ...mixin                        import CommandMixin, ProjectMixin, SetupMixin, VnaMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin
from pathlib                         import Path


class Start(SetupMixin, VnaMixin, ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='start_calibration')
        CommandMixin.__init__(self)
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
        if 'setup' in self.project.procedure['calibration']:
            filename  = self.project.procedure['calibration']['setup']
            self.apply_setup(filename)

        # Clear previously defined cal
        self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:ASS:DEL:ALL")

        # Use UOSM with factory cal
        self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:CONF FNP,''")

        # Define each step
        ports              = self.project.procedure['calibration']['ports']
        num_cal_unit_ports = self.vna.cal_unit().ports
        for i in range(0, num_steps(ports, num_cal_unit_ports)):
            assignment = i + 1
            port_str = port_map_for_step_str(ports, num_cal_unit_ports, i)
            self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:ASS{assignment}:DEF {port_str}")

IS_COMMAND_PLUGIN = True
plugin            = Start
