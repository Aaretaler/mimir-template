import { Card } from "../models/Card";

export const getcards = ( dispatch:any) => {
    fetch('http://localhost:3003/cards')
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        console.log('error ');
    }).then(cards => {
      console.log(JSON.stringify(cards));
      dispatch({type: 'load_cards', payload: cards});
    })
};

export const addCard = (newCard:any, dispatch: any) => {
    fetch('http://localhost:3003/add-card', {method: 'POST', body: JSON.stringify(newCard)}).then(response => {
        return response.json()
      }).then(data => {
        dispatch({type: 'add_card', payload: newCard});
      })
};

export const deleteCard = (deleteCard:Card, dispatch: any) => {
    fetch('http://localhost:3003/delete-card', {method: 'DELETE', body: JSON.stringify(deleteCard)}).then(response => {
        return response.json()
      }).then(data => {
        dispatch({type: 'delete_card', payload: deleteCard});
      })
};

export const updateCard = (updateCardCard:Card, dispatch: any) => {
    fetch('http://localhost:3003/update-card', {method: 'PATCH', body: JSON.stringify(updateCard)}).then(response => {
        return response.json()
      }).then(data => {
        dispatch({type: 'update_card', payload: updateCardCard});
      })
};

