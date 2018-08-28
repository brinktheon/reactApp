const initialState = []

export default function Areas(state = initialState, action){
    if (action.type === 'LOAD_AREAS_DATA'){
      return action.payload;
    }

    return state;
}
