// note: window.location.host
// includes port
// (e.g. localhost:8080)
function url(host) {
  return `ws://${host}/socket`
}
const HOST = window.location.host;
const URL  = url(HOST);

class Socket {
  constructor(url=null) {
    this.close();
    if (url) {
      this.open(url);
    }
  }
  isOpen() {
    if (!this.socket) {
      return false;
    }
    return this.socket.readyState === WebSocket.OPEN;
  }
  open(url=URL) {
    this.socket = new WebSocket(url);
    return new Promise((resolve, reject) => {
      const onopen = () => {
        resolve();
      };
      const onerror = (event) => {
        reject();
      };
      this.socket.onopen  = onopen;
      this.socket.onerror = onerror;
    });
  }
  close() {
    if (this.isOpen()) {
      this.socket.close();
    }
    this.socket = null;
  }
  closed() {
    return new Promise((resolve, reject) => {
      if (!this.isOpen()) {
        reject();
      }
      this.socket.onclose = (event) => {
        resolve(event);
      }
    });
  }
  send(message) {
    if (!this.isOpen()) {
      throw new Error('NOT OPEN!');
    }
    this.socket.send(message);
  }
  read(typefn=undefined) {
    typefn = typefn || ((i) => { return i; });
    return new Promise((resolve, reject) => {
      this.socket.onmessage = (event) => {
        resolve(typefn(event.data));
      };
    });
  }
  async query(message, typefn=undefined) {
    this.send(message);
    return await this.read(typefn);
  }
}

export default Socket;
