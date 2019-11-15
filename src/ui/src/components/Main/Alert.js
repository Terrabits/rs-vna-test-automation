import React from 'react';
import './Alert.scss';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this._cancel = () => {};
    this.state   = {
      context: 'danger',
      text: 'danger-zone',
      visible: false
    };
  }

  show(context, text, timeout=7000) {
    this._cancel();
    this.setState({context, text, visible: true});
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
    return (
      <div id='alert' className={className} role='alert'>
        {this.props.children || this.state.text}
      </div>
    );
  }
}


export default Alert;
