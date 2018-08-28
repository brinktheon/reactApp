import axios from 'axios'

export const getLocalities = (value, guid) => dispatch => {
  var finalLink = 'http://localhost:8080/items/subItems/6/' +
                   guid +
                   '/' +
                   value +
                  '?page=0&size=100';

  axios.get(finalLink)
    .then(res => {
      dispatch({type: 'LOAD_LOCALITY_DATA', payload: res.data});
    })
}
