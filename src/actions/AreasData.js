import axios from 'axios'

export const getAreas = (value, guid) => dispatch => {
  var finalLink = 'http://localhost:8080/items/subItems/3/' +
                   guid +
                   '/' +
                   value +
                  '?page=0&size=100';
                  
  axios.get(finalLink)
    .then(res => {
      dispatch({type: 'LOAD_AREAS_DATA', payload: res.data});
    })
}
