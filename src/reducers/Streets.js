const initialState = []

export default function Streets(state = initialState, action){
    if (action.type === 'LOAD_STREET_DATA'){
      return action.payload;
    }

    return state;
}
