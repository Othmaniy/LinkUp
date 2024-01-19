import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './components/context/authcontext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    

)
