import React      from 'react';
import $          from 'jquery';
import {Collapse} from 'bootstrap';
import Spinner    from './Spinner';
import './Alert.scss';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this._cancel   = () => {};
    this._collapse = null;

    // show/hide
    // controlled by bootstrap/collapse
    this.isShowing = false;

    // react state
    this.state = {
      context: 'danger',
      spinner: false,
      spinnerSize: 'sm',
      text: 'danger-zone'
    };
  }

  componentDidMount() {
    // setup bootstrap collapse
    const div = $('#collapse-alert')[0];
    console.log(`this is div: ${div}`);
    if (!div) {
      return;
    }
    this._collapse = new Collapse(div, {toggle: false});
    this._collapse.hide();
  }

  _show() {
    this.isShowing = true;
  }
  hide() {
    this.isShowing = false;
  }

  show(context, text, spinner=false, timeout=7000) {
    this._cancel();
    this.setState({context, text, spinner});
    this._show();
    this.updateCollapse();
    if (!timeout) {
      return;
    }

    // hide on timeout
    let canceled = false;
    this._cancel = () => {
      canceled = true;
      this._cancel = () => {};
    };
    window.setTimeout(() => {
      if (canceled) {
        return;
      }
      this.hide();
      this.updateCollapse();
    }, timeout);
  }

  updateCollapse() {
    if (!this._collapse) {
      return;
    }
    if (this.isShowing) {
      this._collapse.show();
    }
    else {
      this._collapse.hide();
    }
  }

  render() {
    const context   = this.state.context || 'primary';
    const classes   = ['alert', `alert-${context}`];
    const className = classes.join(' ');
    const spinner   = this.state.spinner && (<Spinner key="spinner"/>);
    const space     = spinner ? ' ' : '';
    const text      = (<span key="text">{`${space}${this.state.text}`}</span>);
    const children  = this.props.children || [spinner, text];
    return (
      <div id='collapse-alert' className="collapse">
        <div id='alert' className={className} role='alert'>
          {children}
        </div>
      </div>
    );
  }
}

export default Alert;
