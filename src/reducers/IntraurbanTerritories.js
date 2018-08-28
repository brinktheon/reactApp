const initialState = []

export default function IntraurbanTerritories(state = initialState, action){
    if (action.type === 'LOAD_INTRAURBANTERRITORY_DATA'){
      return action.payload;
    }

    return state;
}
