from ...block_data             import to_block_data_format
from ...mixin                  import CommandMixin, ProjectMixin
from instrument_server.command import Base
from pathlib                   import Path

class StepImage(ProjectMixin, CommandMixin, Base):
    def __init__(self, devices, **settings):
        Base        .__init__(self, devices, **settings)
        CommandMixin.__init__(self, command='measurement_step_image?', args={'index': int})
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
        steps = len(self.project['measurements'])
        if index >= steps:
            raise self.command_error(f"index must be < {steps}")
        if not 'image' in self.project['measurements'][index]:
            raise self.command_error(f"No image found in measurement step {index}")

        root_path = Path(self.project['__file__']).parent
        filename  = self.project['measurements'][index]['image']
        file_extension = Path(filename).suffix[1:]
        with open(str(root_path / filename), 'rb') as f:
            return f"'{file_extension}',".encode() + to_block_data_format(f.read())

IS_COMMAND_PLUGIN = True
plugin            = StepImage
