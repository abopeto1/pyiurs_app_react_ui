/**
 * This is a service to do all the api calls (get, post, put, delete)
 */

// import React from 'react'
// import { Redirect } from 'react-router-dom' 
import axios from 'axios';
import { computeUrl } from '../utils';
import { createBrowserHistory } from 'history';

export const baseUrl = "http://localhost/apipos/public"
// export const  baseUrl = "https://pyiursboutique.net/apipos/public"

const api = async (method, action) => {
  const url = (action.options && action.options.api)|| (action.params && action.params.api) ? 
    `${baseUrl}/api/${computeUrl(method, action)}` : `${baseUrl}/${computeUrl(method, action)}`
  
  const headers = method === 'GET'
    ? {
      'X-Auth-Token': sessionStorage.token ? sessionStorage.token : null,
    }
    : {
      'Content-Type': method === 'PATCH' ? "application/merge-patch+json" : 'application/json',
      'X-Auth-Token': sessionStorage.token ? sessionStorage.token : null,
    }

  const config = { method, url, headers };

  if (method !== 'GET') {
    config.data = action.body;
  }
  if (method === 'GET' && action.meta.type === 'multi'){
    config.params = action.params
  }

  try {
    const response = await axios.request(config);
    return response;
  }
  catch (e) {
    const {response} = e
    if(response && response.data.status === 401 ){
      sessionStorage.clear()
      createBrowserHistory().push("/login")
    }
  }
};

export default api;
