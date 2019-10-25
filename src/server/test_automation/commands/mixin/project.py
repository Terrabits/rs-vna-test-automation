from pathlib import Path
from ruamel  import yaml

class ProjectMixin(object):
    def __init__(self):
        if not 'project' in self.devices:
            self.project = None
        if not 'is-permanent-project?' in self.devices:
            self.is_permanent_project = False

    # is_permanent_project?
    @property
    def is_permanent_project(self):
        return self.devices['is-permanent-project?']
    @is_permanent_project.setter
    def is_permanent_project(self, value):
        self.devices['is-permanent-project?'] = bool(value)

    # is_project?
    @property
    def is_project(self):
        return bool(self.project)

    # project (dict)
    @property
    def project(self):
        return self.devices['project']
    @project.setter
    def project(self, new_project):
        self.devices['project'] = new_project

    @property
    def project_root_path(self):
        return Path(self.project['__file__']).parent

    def raise_if_not_project(self):
        if not self.project:
            raise self.command_error('project not connected')

    def open(self, filename):
        if self.project:
            raise self.command_error('already a project open')
        self.project = None
        with open(filename, 'r') as f:
            self.project             = yaml.safe_load(f.read())
            self.project['__file__'] = filename
    def open_permanently(self, filename):
        self.open(filename)
        self.is_permanent_project = True
    def close(self):
        self.raise_if_not_project()
        if self.is_permanent_project:
            raise self.command_error('cannot close permanent project')
        self.project = None
