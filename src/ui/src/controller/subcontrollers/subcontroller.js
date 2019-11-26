// import Page from '../page';

class Subcontroller {
  constructor(model, view, controller) {
    this.model      = model;
    this.view       = view;
    this.controller = controller;
  }

  // virtual
  async onNextClicked(currentPage) {
    // handle next being clicked here
  }

  // virtual
  async onBackClicked(currentPage) {
    // handle back being clicked here
  }

  // virtual
  async onSidebarItemClicked(originalPage, destinationPage) {
    // handle sidebar navigation here
  }

  // virtual
  preventSidebarNavigation(originalPage, destinationPage) {
    // return true to cancel pending sidebar navigation.
    return false;
  }

  // virtual
  async updateSubview() {
    // handle update subview
  }

  // update all (sub)views
  async updateView() {
    await this.controller.updateView();
  }

  get currentPage() {
    return this.controller.page;
  }
  set currentPage(page) {
    this.controller.page = page;
  }

  async showErrorOrMessage(message) {
    const errors = await this.model.errors();
    const msg = errors.length ?
      errors[0]
      : message;
    this.view.alert.show('danger', msg);
  }
}

export default Subcontroller;
