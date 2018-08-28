const initialState = []

export default function Regions(state = initialState, action){
    if (action.type === 'LOAD_REGION_DATA'){
      return action.payload;
    }

    return state;
}
