import api from '../services/api';

/**
 * Middleware to do the api call and send success or fail action
 * depending on the response
 */
const apiMiddleware = store => next => (action) => {
  let method = null;
  const { type } = action;
  if (type.startsWith('REQUEST_READ_')) {
    method = 'GET';
  }
  if (type.startsWith('REQUEST_CREATE_')) {
    method = 'POST';
  }
  if (type.startsWith('REQUEST_UPDATE_') || type.startsWith('REQUEST_ADD_')) {
    method = action.options.method || 'PUT';
  }
  if (type.startsWith('REQUEST_DELETE_') || type.startsWith('REQUEST_REMOVE_')) {
    method = 'DELETE';
  }

  if (method) {
    api(method, action)
      .then((response) => {
          store.dispatch({
            type: action.type.replace('REQUEST', 'SUCCESS'),
            payload: response.data['hydra:member'] || response.data,
            meta: {
              ...action.meta,
              pagination: {
                total_items: response.data['hydra:totalItems'],
              }
            },
          });
          return response;
      })
      .then((response) => {
        if (action.options.onSuccess) {
          const data = response.data['hydra:member'] || response.data
          action.options.onSuccess(data);
        }
      })
      .catch((error) => {
        store.dispatch({
          type: action.type.replace('REQUEST', 'FAIL'),
          error,
          meta: action.meta,
        });
        if (action.options.onFail) {
          action.options.onFail(error);
        }
      });
  }

  next(action);
};

export default apiMiddleware;
