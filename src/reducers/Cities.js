const initialState = []

export default function Cities(state = initialState, action){
    if (action.type === 'LOAD_CITIES_DATA'){
      return action.payload;
    }

    return state;
}
