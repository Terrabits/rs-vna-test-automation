import Page from '../page';

class SubController {
  constructor(controller) {
    // Available to subclasses:
    this.model      = controller.model;
    this.view       = controller.view;
    this.controller = controller;
  }

  // callbacks go here

  // virtual
  registerCallbacks() {
    // register callbacks here
  }

  // virtual
  updateSubView() {
    // update subview here
  }

  isPage(name, step=-1) {
    return this.controller.step == Page(name, step);
  }
  updateView() {
    this.controller.updateView();
  }
}

export default SubController;
