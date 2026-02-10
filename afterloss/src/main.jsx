import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Remove loading screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loading')
  if (loader) {
    loader.style.opacity = '0'
    setTimeout(() => loader.remove(), 300)
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)