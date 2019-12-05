from .zip import ProjectZip

class ProjectMixin(object):
    def __init__(self):
        if not 'project' in self.state:
            self.project = None
        if not 'is-permanent-project?' in self.state:
            self.is_permanent_project = False

    # is_permanent_project?
    @property
    def is_permanent_project(self):
        return self.state['is-permanent-project?']
    @is_permanent_project.setter
    def is_permanent_project(self, value):
        self.state['is-permanent-project?'] = bool(value)

    # is_project?
    @property
    def is_project(self):
        return bool(self.project)

    # project (dict)
    @property
    def project(self):
        return self.state['project']
    @project.setter
    def project(self, new_project):
        self.state['project'] = new_project

    def raise_if_not_project(self):
        if not self.project:
            raise self.command_error('project not connected')

    def open(self, filename):
        if self.project:
            raise self.command_error('already a project open')
        try:
            self.project = ProjectZip(filename)
        except Exception as error:
            raise self.command_error(f"unable to open project '{filename}' with error '{error}'")
    def open_permanently(self, filename):
        self.open(filename)
        self.is_permanent_project = True
    def close(self):
        self.raise_if_not_project()
        if self.is_permanent_project:
            raise self.command_error('cannot close permanent project')
        self.project = None
