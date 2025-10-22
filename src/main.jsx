import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ContextProvider from './contexts/ContextProvider.jsx';
import Home from './pages/home/Home.jsx';
import Auth from './pages/Auth.jsx';
import HomeIndex from './pages/home/HomeIndex.jsx';
import GameDetails from './pages/home/GameDetails.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ContextProvider>
        <App />
      </ContextProvider>
    ),
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            index: true,
            element: <HomeIndex />,
          },
          {
            path: 'details/:id',
            element: <GameDetails />,
          },
        ],
      },
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            path: 'log-in',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
