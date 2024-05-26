import { Card } from "../models/Card";

 export const reducer = (state: any, action: any) => {
// //     // action: type:string, payload: cards

     if (action.type === 'load_cards') {
         console.log('loading cards');
        state = action.payload;
         return state;
    }
     if (action.type === 'add_card') {
         console.log('add card');
      const newCard = action.payload;
        state = [...state, newCard];
        return state;
     }
    if (action.type === 'delete_card') {
         console.log('delete card'+JSON.stringify(state));
       const cardIdToDelete = action.payload.id;
       return state.filter((card: any) => card.id !== cardIdToDelete);
  }
  if (action.type === 'update_card') {
    console.log('update card');
    const updatedCard = action.payload;
    return state.map((card: Card) =>
        card.id === updatedCard.id ? { ...card, ...updatedCard } : card
    );
}

}
