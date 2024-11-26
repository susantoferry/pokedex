import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActiveIndexProvider } from './context/ActiveIndexProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActiveIndexProvider>
      <App />
    </ActiveIndexProvider>
  </StrictMode>,
)
