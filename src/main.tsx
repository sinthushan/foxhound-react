import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './services/user.tsx'
import { JobProvider } from './services/jobsService.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
   <UserProvider>
    <JobProvider> 
        <App />
      </JobProvider> 
    </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
