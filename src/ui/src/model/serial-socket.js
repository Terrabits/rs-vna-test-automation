// note: window.location.host
// includes port
// (e.g. localhost:8080)
function url(host) {
  return `ws://${host}/socket`
}
const HOST = window.location.host;
const URL  = url(HOST);

class SerialSocket {
  constructor() {
    this.url      = null;
    this.socket   = null;
    this.promises = [];
  }

  isOpen() {
    return this.socket.readyState === WebSocket.OPEN;
  }

  open(url=URL) {
    if (this.socket) {
      throw new Error('Cannot re-open SerialSocket!');
    }
    this.url      = url;
    this.promises = [];
    return new Promise((resolve, reject) => {
      this.promises.push({resolve, reject});
      this.socket = new WebSocket(url);
      this._registerCallbacks();
    });
  }
  send(text) {
    console.log(`send: ${text}`);
    this.socket.send(text);
  }
  query(text, typefn=async(i)=>{return i}) {
    return new Promise((resolve, reject) => {
      this.promises.push({resolve, reject, typefn});
      this.send(text);
    });
  }

  // callbacks
  _registerCallbacks() {
    this.socket.onopen    = this._onOpen.bind(this);
    this.socket.onerror   = this._onError.bind(this);
    this.socket.onmessage = this._onMessage.bind(this);
    this.socket.onclose   = this._onClose.bind(this);
  }
  _onOpen() {
    console.log('socket open');
    const next = this.promises.shift();
    next.resolve();
  }
  _onError(event) {
    console.log(`error: ${event}`);
    const next = this.promises.shift();
    next.reject(event);
  }
  _onMessage(event) {
    console.log(`recv: ${event.data} (${event.type})`);
    const next = this.promises.shift();
    (async () => {
      const result = await next.typefn(event.data);
      next.resolve(result);
    })();
  }
  _onClose(event) {
    console.log(`socket close: ${event}`);
    this.promises.forEach((i) => {
      i.reject(event);
    });
  }
}

export default SerialSocket;
