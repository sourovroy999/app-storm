import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'

import AuthProvider from './providers/AuthProvider.jsx'
import {RouterProvider} from 'react-router'
import { router } from './routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient=new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster/>
      
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
