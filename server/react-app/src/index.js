import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import App from './app/App';

// 렌더 
function render(){
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <App />
  );
}

render()



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
