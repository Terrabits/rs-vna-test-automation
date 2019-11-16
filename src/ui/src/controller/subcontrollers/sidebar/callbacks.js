class Callbacks {
  constructor() {
    this.callbacks = {};
  }

  // External interface
  setFor(heading, callback) {
    this.callbacks[heading] = callback;
  }

  // internal interface for constructing sidebarItems
  generateForItem(heading, index=null) {
    this._addHeadingIfNew(heading);
    return (event) => {
      event.preventDefault();
      this.callbacks[heading](index);
    };
  }

  _isNewHeading(name) {
    return !this.callbacks.hasOwnProperty(name);
  }
  _addHeadingIfNew(name) {
    if (!this._isNewHeading(name)) {
      return;
    }

    const callback = (index=null) => {
      if (index == null) {
        console.log(`${name} clicked`)
      }
      else {
        console.log(`${name} step ${index} clicked`)
      }
    };
    this.setFor(name, callback)
  }
}

export default Callbacks;
