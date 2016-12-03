import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './style.css';

class Button extends Component {
  render() {
    const { label, primary, secondary, danger } = this.props;
    return (
      <div className={classNames('btn', {
        'primary-btn': primary,
        'secondary-btn': secondary,
        'danger-btn': danger,
      })} onClick={this.props.onClick}>{label}</div>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  primary: PropTypes.bool,
};

export default Button;