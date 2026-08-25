import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/onest';
import '@fontsource-variable/unbounded';
import BoldApp from './BoldApp';
import './bold.css';

createRoot(document.getElementById('bold-root')).render(
  <StrictMode>
    <BoldApp />
  </StrictMode>
);
