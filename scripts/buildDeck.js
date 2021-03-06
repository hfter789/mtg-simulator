import axios from 'axios';
import fs from 'fs';
import map from 'async/map';
import data from '../decks/infect_raw.json';
import cardCache from '../decks/cardCache.json';
const API = 'https://api.magicthegathering.io/v1/cards?name=';

const library = [];

function addCards(targetCard, cardObj) {
  for (let i = 0; i < targetCard.count; i++) {
    library.push(cardObj);
  }
}

function buildCardObj(targetCard, callback) {

  if (cardCache[targetCard.name]) {
    addCards(targetCard, cardCache[targetCard.name]);
    callback();
  } else {
    axios.get(`${API}${targetCard.name}`)
    .then(function (response) {
      const cards = response.data.cards.filter((card) => card.imageUrl);
      if (cards.length) {
        const card = cards[cards.length-1];
        const cardObj = {
          id: card.multiverseid,
          imageUrl: card.imageUrl,
          name: card.name,
        }
        addCards(targetCard, cardObj);
        cardCache[targetCard.name] = cardObj;
      } else {
        console.log(`No valid card found for ${card.name}`);
      }
      callback();
    })
    .catch(function (error) {
      console.log(`Request failed for ${targetCard.name}`, error);
      callback();
    });
  }
}

map(data, buildCardObj, (err) => {
  if(err) {
    // One of the iterations produced an error.
    // All processing will now stop.
    console.log('A file failed to process');
  } else {
  fs.writeFile('./decks/infect.json', JSON.stringify(library, null, '\t'));
  fs.writeFile('./decks/cardCache.json', JSON.stringify(cardCache, null, '\t'));
  console.log('done');
}});

