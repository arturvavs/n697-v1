import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'XoqsL31JZmgEcf6Wi7sFHgK8OR8SuW0LfiN8KGGK';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'xT1kceAL0oqua2X6SAHN4L8VkyuXTuUOpFyxgLb0';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
