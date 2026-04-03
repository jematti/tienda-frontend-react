import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { TiendaProvider } from './context/TiendaProvider'
import { router } from './assets/router'
import './assets/index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TiendaProvider>
      <RouterProvider router={router} />
    </TiendaProvider> 
  </StrictMode>,
)

