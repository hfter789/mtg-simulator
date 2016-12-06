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
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  onImageClick() {
    this.props.toggleTap(this.props);
  }

  onMouseMove(e) {
    this.props.showZoomInImage({x:e.clientX, y:e.clientY}, this.props);
  }

  onMouseLeave() {
    this.props.removeZoomInImage();
  }

  handleRightClick(e) {
    e.preventDefault();
    this.props.showCardMenu(this.props);
  }

  renderCounterOverlay() {
    const { counter } = this.props;
    if (!counter) {
      return null;
    }
    return (
      <div className='Card-counter-overlay'>
        { counter.powCounter }
        /
        { counter.toughCounter }
      </div>
    );
  }

  renderToken() {
    const { tokenDesc, tokenName, disableTap, isTapped } = this.props;
    return (
      <div className={classNames('Card-token', {
          'Card-rotated': isTapped
        })}
        onContextMenu={this.handleRightClick}
        onClick={disableTap ? null : this.onImageClick}
      >
        <p><b>{tokenName}</b></p>
        {tokenDesc}
      </div>
    );
  }

  render() {
    const {
      className,
      connectDragSource,
      disableTap,
      imageUrl,
      name,
      isToken,
      isDragging,
      isFacedown,
      isTapped,
      style
    } = this.props;

    if (isDragging) {
      return null;
    }
    return connectDragSource(
      <div className='Card-container'>
        {
          isToken ?
          this.renderToken()
          :
          <img
            className={classNames(className, {
              'Card-rotated': isTapped
            })}
            src={isFacedown ? mtgCardBack : imageUrl}
            alt={name}
            style={style}
            onClick={disableTap ? null : this.onImageClick}
            onMouseMove={isFacedown ? null : this.onMouseMove }
            onMouseLeave={isFacedown ? null : this.onMouseLeave }
            onContextMenu={this.handleRightClick}
          />
        }
        { this.renderCounterOverlay() }
      </div>
    );
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.cardId,
      deckId: props.deckId,
      imageUrl: props.imageUrl,
      name: props.name,
      player: props.player,
      tokenName: props.tokenName,
      tokenDesc: props.tokenDesc,
      isToken: props.isToken,
      counter: props.counter,
    };
  },

  canDrag(props, monitor) {
    return !props.disableDrag;
  },

  endDrag(props, monitor, card) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      // we have to remove first since item is shared, this is not nice, will fix it later
      props.removeCardFromHolder(item, card.props.player, card.props['data-holder-name']);
      props.addCardToHolder(item, dropResult.player, dropResult.holderName);
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