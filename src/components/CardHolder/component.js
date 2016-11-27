import React, { Component } from 'react';
import './style.css';
import { DropTarget } from 'react-dnd';

class CardHolder extends Component {
  render() {
    const { className, name, connectDropTarget, children } = this.props;

    return connectDropTarget(
      <div className={className}>
        <div className='CardHolder-label'> { name } </div>
        { children }
      </div>
    );
  }
}

const HolderTarget = {
  drop(props, monitor) {
    return { holderName: props.name };
  }
};

const connect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

export default DropTarget('card', HolderTarget, connect)(CardHolder);