import axios from 'axios'

export const getRegions = (value) => dispatch => {
  var finalLink = 'http://localhost:8080/items/1/' +
                   value +
                  '?page=0&size=100';

  axios.get(finalLink)
    .then(res => {
      dispatch({type: 'LOAD_REGION_DATA', payload: res.data});
    })
}
