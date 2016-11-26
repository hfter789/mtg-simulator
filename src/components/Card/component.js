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

const boxSource = {
  beginDrag(props) {
    return {
      id: props.cardId
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    // if (dropResult) {
    //   console.log( // eslint-disable-line no-alert
    //     `You dropped ${item.id} into ${dropResult.holderName}!`
    //   );
    // }
    // TODO: dispatch an action to add card to the holder!
    // TODO2: remove card from current holder!
  }
};

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('card', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);