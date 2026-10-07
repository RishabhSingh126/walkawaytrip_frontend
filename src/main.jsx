import { StrictMode } from 'react';
import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);