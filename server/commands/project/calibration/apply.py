from ...mixin                  import CommandMixin, ProjectMixin, VnaMixin
from instrument_server.command import Base

class Apply(VnaMixin, ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='apply_calibration?', args={'cal_group_name': None})
        ProjectMixin.__init__(self)
        VnaMixin    .__init__(self)

    @property
    def help_str(self):
        return 'Calculate corrections, apply to channel and (optionally) save to <cal_group_name>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_vna()
        self.raise_if_not_project()

        channel        = 1
        cal_group_name = args['cal_group_name'].replace("'", '').strip()
        timeout_ms     = 5000 # 5 s

        # apply
        self.vna.write(f"SENS{channel}:CORR:COLL:AUTO:SAVE")
        try:
            self.vna.pause(timeout_ms)
        except socket.timeout as ex:
            return False

        # save
        if cal_group_name:
            self.vna.channel(channel).save_cal(cal_group_name)

        # success
        return True

IS_COMMAND_PLUGIN = True
plugin            = Apply
