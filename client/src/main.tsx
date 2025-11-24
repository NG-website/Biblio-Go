import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import { CssBaseline } from '@mui/material'
import { AuthProvider } from './components/Context/AuthContext.tsx'
//import { AuthProvider } from './components/Context/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
   <ThemeProvider theme={theme}>
     <CssBaseline />
    <App />
  </ThemeProvider>
  </AuthProvider>
  </StrictMode>,
)
