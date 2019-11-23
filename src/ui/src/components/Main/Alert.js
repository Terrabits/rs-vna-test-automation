import React from 'react';
import Spinner from './Spinner';
import './Alert.scss';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this._cancel = () => {};
    this.state   = {
      context: 'danger',
      spinner: false,
      spinnerSize: 'sm',
      text: 'danger-zone',
      visible: false
    };
  }

  show(context, text, spinner=false, timeout=7000) {
    this._cancel();
    this.setState({context, text, spinner, visible: true});
    if (!timeout) {
      return;
    }

    // close on timeout
    let canceled = false;
    this._cancel = () => {
      canceled = true;
      this._cancel = () => {};
    };
    window.setTimeout(() => {
      if (canceled) {
        return;
      }
      this.close();
    }, timeout);
  }
  close() {
    this._cancel();
    this.setState({visible: false});
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    const context   = this.state.context || 'primary';
    const classes   = ['alert', `alert-${context}`, 'fade', 'show'];
    const className = classes.join(' ');
    const spinner   = this.state.spinner && (<Spinner key="spinner"/>);
    const space     = spinner ? ' ' : '';
    const text      = (<span key="text">{`${space}${this.state.text}`}</span>);
    const children  = this.props.children || [spinner, text];
    return (
      <div id='alert' className={className} role='alert'>
        {children}
      </div>
    );
  }
}


export default Alert;
