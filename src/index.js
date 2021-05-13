import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { configureStore } from './store';

const store = configureStore();

console.log('store state= ', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//install prettifier extension from vscode  extension tab

//install Reactjs code snippets extension from vscode extension tab and then you can use below components
// rcc to create a class component ,rsf to create a stateless function compoonent
