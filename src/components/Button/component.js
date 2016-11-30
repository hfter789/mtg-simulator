import React, { Component, PropTypes } from 'react';
import './style.css';

class Button extends Component {
  render() {
    const { label } = this.props;
    return (
      <div className='btn primary-btn' onClick={this.props.onClick}>{label}</div>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  primary: PropTypes.bool,
};

export default Button;