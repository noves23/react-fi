import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ItemsPage } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ItemsPage />
  </StrictMode>,
)

