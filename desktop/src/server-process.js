const {execFile, spawn} = require('child_process');
const fs      = require('fs');
const path    = require('path');
const waitOn  = require('wait-on');

// paths
const bin_filename     = path.join(__dirname, '..', 'server', 'test-automation');
const project_filename = path.join(__dirname, '..', 'project', 'project.zip');

// execFile settings
let   args     = ['--http-only', '--serve-dev'];
const options  = {
  // stdio: 'inherit'
};

// permanent project?
if (fs.existsSync(project_filename)) {
  args = ['--project', project_filename].concat(args)
}

class ServerProcess {
  constructor() {
    this.process = execFile(bin_filename, args, options);
  }

  kill(signal='SIGINT') {
    this.process.kill(signal);
  }

  available() {
    if (this.process.exitCode !== null) {
      return Promise.reject();
    }
    const opts = {
      resources: ['http-get://localhost:8080/index.html'],
      timeout: 6000,
      window: 0
    };
    return waitOn(opts);
  }
}

module.exports = ServerProcess;
