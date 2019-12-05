from ruamel  import yaml
from zipfile import ZipFile

class ProjectZip:
    def __init__(self, zip_filename):
        self.zip_filename = zip_filename
        self.procedure    = yaml.safe_load(self.read_file('procedure.yaml'))

    def read_file(self, filename):
        with ZipFile(self.zip_filename) as zip:
            with zip.open(filename) as file:
                return file.read()
