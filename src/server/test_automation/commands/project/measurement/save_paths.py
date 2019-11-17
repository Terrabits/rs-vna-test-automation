from   pathlib import Path
from   pathvalidate import sanitize_filename
import shutil

class SavePaths:
    def __init__(self, root_path, serial_no):
        self.root_path = Path(root_path)
        self.serial_no = serial_no

    # serial_no/
    @property
    def part_path(self):
        return self.root_path / sanitize_filename(self.serial_no)

    # mkdir -p serial_no/
    def mkdir_p(self):
        self.part_path.mkdir(parents=True, exist_ok=True)

    # serial_no.zip
    @property
    def zip_filename(self):
        return f'{self.part_path}.zip'

    # => serial_no.zip
    def zip(self):
        shutil.make_archive(str(self.part_path), 'zip', str(self.part_path), str(self.part_path))

    # serial_no/serial_no.html
    def summary_filename(self):
        serial_no = sanitize_filename(self.serial_no)
        return str(self.part_path / f'{serial_no}.html')

    # serial_no/data/
    @property
    def data_path(self):
        return self.part_path / 'data'

    # serial_no/data/{step_name}/
    def data_path_for(self, step_name):
        return self.data_path / sanitize_filename(step_name)

    # serial_no/data/{step_name}/markers/
    def markers_path_for(self, step_name):
        return self.data_path_for(step_name) / 'markers'

    # serial_no/data/{step_name}/markers/{trace_name}.csv
    def markers_filename_for(self, step_name, trace_name):
        trace_name = sanitize_filename(trace_name)
        return str(self.markers_path_for(step_name) / f'{trace_name}.csv')

    # serial_no/data/{channel_name}.s{N}p
    def channel_filename_for(self, step_name, channel_name, num_ports='{N}'):
        channel_name = sanitize_filename(channel_name)
        return str(self.data_path_for(step_name) / f'{channel_name}.s{num_ports}p')

    # serial_no/data/{trace_name}.csv
    def trace_filename_for(self, step_name, trace_name):
        trace_name = sanitize_filename(trace_name)
        return str(self.data_path_for(step_name) / f'{trace_name}.csv')

    # serial_no/images/
    @property
    def images_path(self):
        return self.part_path / 'images'

    # serial_no/images/{step_name}/
    def diagram_path_for(self, step_name):
        return self.images_path / sanitize_filename(step_name)

    def screenshot_filename_for(self, step_name, image_file_extension='jpg'):
        return str(self.diagram_path_for(step_name) / f'screenshot.{image_file_extension}')

    # serial_no/images/{step_name}/{diagram_name}.{image_file_extension}
    def diagram_filename_for(self, step_name, diagram_name, image_file_extension='jpg'):
        diagram_name = sanitize_filename(diagram_name)
        return str(self.diagram_path_for(step_name) / f'{diagram_name}.{image_file_extension}')
