#!/usr/bin/env node
const {execFile} = require('child_process');

// TODO: answer these questions two
// - server/test-automation in app.asar?
// - execFile path relative to app.asar?
const filename = 'server/test-automation';
const args     = ['--http-only']
const options  = {
  stdio: 'ignore',
  windowsHide: true
};

class ServerProcess {
  constructor() {
    this.data    = [];
    this.process = execFile(filename, args);
    this.process.stdout.on('data', (data) => {this.data.push(data)});
    this.process.on('error', (error) => console.log(`Error: ${error}`));
    this.process.on('close', (code)  => console.log(`Exit code: ${code}`));
  }
  get running() {
    return this.process.running;
  }
  kill(signal='SIGTERM') {
    this.process.kill(signal);
  }
}

// p = spawn(, ['--http-only'], {stdio: 'inherit'});
// p.stdout.on('data', (data) => console.log(`${data}`));
// p.stderr.on('data', (data) => console.log(`${data}`));
// p.on('error', (error) => console.log(`Error:     ${error}`))
// p.on('close', (code)  => console.log(`Exit code: ${code}`));

module.exports = ServerProcess;
