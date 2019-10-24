const {execFile, spawn} = require('child_process');
const path    = require('path');
const waitOn  = require('wait-on');

const filename = path.join(__dirname, '..', 'server', 'test-automation');
const args     = ['--http-only'];
const options  = {
  // stdio: 'inherit'
};

class ServerProcess {
  constructor() {
    this.process = execFile(filename, args, options);
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
