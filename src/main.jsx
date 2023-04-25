import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import BlueBlob from '../src/assets/blobs_blue.svg?component'
import YellowBlob from '../src/assets/blobs_yellow.svg?component'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <BlueBlob className='blob-blue'/>
    <YellowBlob className='blob-yellow'/>
  </React.StrictMode>,
)
