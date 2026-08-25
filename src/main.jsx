import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/onest';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/oswald';
import CampaignApp from './campaign/CampaignApp';
import './campaign/campaign.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CampaignApp />
  </StrictMode>
);
