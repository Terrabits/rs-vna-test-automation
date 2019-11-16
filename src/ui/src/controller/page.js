class Page {
  constructor(name, step=-1) {
    this.name = name;
    this.step = step;
  }

  is(name, step=-1) {
    if (this.name !== name) {
      // different pages
      return false;
    }
    if (step !== -1) {
      // steps must be equal
      return this.step === step;
    }
    else {
      return true;
    }
  }

  copy() {
    return new Page(this.name, this.step);
  }
}

export default Page;
