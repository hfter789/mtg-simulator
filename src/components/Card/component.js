import React, { Component, PropTypes } from 'react';
import './style.css';
import { DragSource } from 'react-dnd';

class Card extends Component {

  render() {
    const { className, connectDragSource, imageUrl, name, isDragging, style } = this.props;

    return connectDragSource(
      <img
        className={className}
        src={imageUrl}
        alt={name + isDragging}
        style={style} />
    );
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.cardId,
      imageUrl: props.imageUrl,
      name: props.name,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.addCardToHolder(item, dropResult.holderName);
      // TODO2: remove card from current holder!
    }
  }
};

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);