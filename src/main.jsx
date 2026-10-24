import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production builds ship prerendered HTML (scripts/prerender.mjs); hydrate it.
// In dev the root is empty, so render normally.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
