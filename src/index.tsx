import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

const container = document.querySelector('#root')!;
const root = ReactDOM.createRoot(container);

// eslint-disable-next-line react/jsx-filename-extension
root.render(<App />);
