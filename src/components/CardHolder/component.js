import React, { Component } from 'react';
import './style.css';
import { DropTarget } from 'react-dnd';

class CardHolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerOffset: {x: 0, y: 0}
    };
  }

  componentDidMount() {
    const container = this.refs.container;
    if (container) {
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = container.getBoundingClientRect();
      const x = elemRect.left - bodyRect.left;
      const y = elemRect.top - bodyRect.top;
      this.setState({
        containerOffset: {
          x,
          y,
        }
      });
    }
  }

  render() {
    const { className, name, connectDropTarget, children } = this.props;

    return connectDropTarget(
      <div className={className}>
        <div ref='container' style={{height: '100%'}}>
          <div className='CardHolder-label'> { name } </div>
          { children }
        </div>
      </div>
    );
  }
}

const HolderTarget = {
  drop(props, monitor, component) {
    const { x, y } = monitor.getSourceClientOffset();
    return {
      holderName: props.name,
      player: props.player,
      delta: monitor.getDifferenceFromInitialOffset(),
      lastOffset: {
        x: x - component.state.containerOffset.x,
        y: y - component.state.containerOffset.y-20,
      },
    };
  }
};

const connect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

export default DropTarget('card', HolderTarget, connect)(CardHolder);