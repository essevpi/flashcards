import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './context/context.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.jsx';
import Subject from './routes/subject.jsx';

import './index.css';
import Topic from './routes/topic.jsx';
import Deck from './routes/deck.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/:subjectName',
    element: <Subject />,
    errorElement: <div>404</div>,
  },
  {
    path: '/:subjectName/:topicName',
    element: <Topic />,
    errorElement: <div>404</div>,
  },
  {
    path: '/:subjectName/:topicName/:deckName',
    element: <Deck />,
    errorElement: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
