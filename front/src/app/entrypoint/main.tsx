import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from '../routers';

import '@/app/providers/language/i18n';

import '@/app/styles/variables.css';
import '@/app/styles/base.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      < RouterProvider router={router} />
  </StrictMode>,
)
