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
import AuthProtected from './routes/AuthProtected.jsx';
import AppLoadingProtected from './routes/AppLoadingProtected.jsx';
import GameDetailsProtected from './routes/GameDetailsProtected.jsx';
import NotFound from './pages/NotFound.jsx';
import Profile from './pages/Profile.jsx';
import ProfileProtected from './routes/ProfileProtected.jsx';
import ResetPassword from './components/auth/ResetPassword.jsx';

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ContextProvider>
        <AppLoadingProtected>
          <App />
        </AppLoadingProtected>
      </ContextProvider>
    ),
    errorElement: <NotFound />,
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
            element: (
              <GameDetailsProtected>
                <GameDetails />
              </GameDetailsProtected>
            ),
          },
          {
            path: 'profile',
            element: (
              <ProfileProtected>
                <Profile />
              </ProfileProtected>
            ),
          },
        ],
      },
      {
        path: 'auth',
        element: (
          <AuthProtected>
            <Auth />
          </AuthProtected>
        ),
        children: [
          {
            path: 'log-in',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          }
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
