from pathlib import Path
class ProjectMixin(object):
    def __init__(self):
        if not 'project' in self.devices:
            self.devices['project'] = None

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
