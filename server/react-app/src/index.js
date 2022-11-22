import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

import MemberContext from './context/MemberContext';

import reportWebVitals from './reportWebVitals';
import Cookies from 'js-cookie';

import App from './app/App';

const [memberId, setMemberId] = useState(Cookies.get('member_id'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MemberContext.Provider value={{memberId, setMemberId}}>
    <App />
  </MemberContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
