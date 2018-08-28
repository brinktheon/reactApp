const initialState = []

export default function Localities(state = initialState, action){
    if (action.type === 'LOAD_LOCALITY_DATA'){
      return action.payload;
    }

    return state;
}
