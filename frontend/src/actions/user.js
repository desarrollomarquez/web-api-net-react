import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const formatData = data => ({
  ...data,
  quantity: parseInt(data.quantity ? data.quantity : 1)
  // addedToCart: string(data.addedToCart ? data.addedToCart : "false")
})


export const fetchAll = () => (dispatch) => {
  // operacije ...
  // get api req
  api.user().fetchAll()
    .then(response => {
      // console.log(response)
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      })
    })
    .catch((err) => console.log(err));
}

export const create = (data, onSuccess) => dispatch => {
  data = formatData(data)
  api.user().create(data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data
      })
      onSuccess()
    })
    .catch((err) => console.log(err));
}


export const update = (id, data, onSuccess) => dispatch => {
  data = formatData(data)
  api.user().update(id, data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data }
      })
      onSuccess()
    })
    .catch((err) => console.log(err));
}


export const Delete = (id, onSuccess) => dispatch => {
  api.user().delete(id)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id
      })
      onSuccess()
    })
    .catch((err) => console.log(err));
}