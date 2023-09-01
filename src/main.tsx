import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from 'react-router-dom'
import { IconContext } from 'react-icons'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
        <App />
      </IconContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
