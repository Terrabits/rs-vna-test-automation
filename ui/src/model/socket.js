const HOSTNAME      = window.location.hostname
const PORT          = 61537;
function url(hostname, port) {
  return `ws://${hostname}:${port}`
}
const URL           = url(HOSTNAME, PORT);

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
        console.log(`Model.open().onerror(event: ${event})`);
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
        const blob     = event.data;
        const reader   = new FileReader();
        reader.onload  = () => {
          const result = typefn(reader.result);
          resolve(result);
        };
        reader.onerror = () => {
          reject();
        };
        reader.readAsText(blob);
      };
    });
  }
  query(message, typefn=undefined) {
    const promise = this.read(typefn);
    this.socket.send(message);
    return promise;
  }
}

export default Socket;
