import React, { Component, PropTypes } from 'react';
import './style.css';
import { DragSource } from 'react-dnd';
import classNames from 'classnames';
import mtgCardBack from '../../assets/mtg-cardback.jpg';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTapped: false,
    };
    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick() {
    this.setState({
      isTapped: !this.state.isTapped,
    });
  }

  render() {
    const { className, connectDragSource, disableTap, imageUrl, name, isDragging, isFacedown, style } = this.props;
    const { isTapped } = this.state;
    if (isDragging) {
      return null;
    }
    return connectDragSource(
      <img
        className={classNames(className, {
          'Card-rotated': isTapped
        })}
        src={isFacedown ? mtgCardBack : imageUrl}
        alt={name}
        style={style}
        onClick={disableTap ? null : this.onImageClick}
      />
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

  canDrag(props, monitor) {
    return !props.disableDrag;
  },

  endDrag(props, monitor, card) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.addCardToHolder(item, dropResult.holderName);
      props.removeCardFromHolder(item, card.props['data-holder-name']);
    }
  }
};

Card.propTypes = {
  canDrag: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);