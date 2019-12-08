from ...block_data import to_block_data_format
from ...mixin      import CommandMixin, ProjectMixin
from instrument_server.command       import Base
from instrument_server.command.mixin import ParserMixin
from pathlib       import Path

class StepImage(ProjectMixin, CommandMixin, ParserMixin, Base):
    def __init__(self, devices, state, **settings):
        Base        .__init__(self, devices, state, **settings)
        ParserMixin .__init__(self, command='measurement_step_image?', args={'index': int})
        CommandMixin.__init__(self)
        ProjectMixin.__init__(self)

    @property
    def help_str(self):
        return 'Query info for measurement step <i>'

    def execute(self, received_command):
        args = self.args(received_command)
        self.raise_if_not_project()
        index = args['index']
        if index < 0:
            raise self.command_error('index must be >= 0')
        steps = len(self.project.procedure['measurements'])
        if index >= steps:
            raise self.command_error(f"index must be < {steps}")
        if not 'image' in self.project.procedure['measurements'][index]:
            raise self.command_error(f"No image found in measurement step {index}")

        filename       = self.project.procedure['measurements'][index]['image']
        image_data     = self.project.read_file(filename)
        return to_block_data_format(image_data)

IS_COMMAND_PLUGIN = True
plugin            = StepImage
