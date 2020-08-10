import React from 'react'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import 'react-vis/dist/style.css'
import AppLayout from './components/Layout';
import setupStore from './redux';

export const store = setupStore({},
  { debug: false }
);

const App = () => {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  )
}

export default App