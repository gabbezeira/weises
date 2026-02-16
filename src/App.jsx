import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import WebGLBackground from './components/common/WebGLBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import ErrorBoundary from './utils/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const Login = lazy(() => import('./pages/Login'));

const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const ProtectedRoute = lazy(() => import('./components/common/ProtectedRoute'));

import { AdminProvider } from './context/AdminContext';
const AdminLayout = lazy(() => import('@admin/layout/AdminLayout/index'));
const Dashboard = lazy(() => import('@admin/pages/Dashboard'));
const ClientList = lazy(() => import('@admin/pages/ClientList'));
const ClientForm = lazy(() => import('@admin/pages/ClientForm'));
const ProjectList = lazy(() => import('@admin/pages/ProjectList'));
const ProjectForm = lazy(() => import('@admin/pages/ProjectForm'));
const ProjectBoard = lazy(() => import('@admin/pages/ProjectBoard'));
const AdminProjectDetail = lazy(() => import('@admin/pages/ProjectDetail/index'));
const AdminFinancial = lazy(() => import('@admin/pages/Financial'));
const AdminServices = lazy(() => import('@admin/pages/Services'));
const AdminSettings = lazy(() => import('@admin/pages/Settings'));

import { ClientProvider } from './context/ClientContext';
const ClientLayout = lazy(() => import('./components/Client/layout'));
const ClientDashboard = lazy(() => import('./components/Client/pages/Dashboard'));
const ClientProjects = lazy(() => import('./components/Client/pages/Projects'));
const ClientBilling = lazy(() => import('./components/Client/pages/Billing'));
const ClientServices = lazy(() => import('./components/Client/pages/Services'));
const ClientProjectDetail = lazy(() => import('./components/Client/pages/ProjectDetail'));

const AnimatedRoutes = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = React.useState(location);
  const [transitionStage, setTransitionStage] = React.useState('idle');

  React.useEffect(() => {
    if (
      location.pathname.startsWith('/admin') ||
      location.pathname.startsWith('/client') ||
      location.pathname.startsWith('/login')
    ) {
      setDisplayLocation(location);
      return;
    }

    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeIn');
    }
  }, [location, displayLocation]);

  React.useEffect(() => {
    if (transitionStage === 'fadeIn') {
      const timer = setTimeout(() => {
        setTransitionStage('switching');
      }, 500);
      return () => clearTimeout(timer);
    }

    if (transitionStage === 'switching') {
      setDisplayLocation(location);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      const timer = setTimeout(() => {
        setTransitionStage('fadeOut');
      }, 100);
      return () => clearTimeout(timer);
    }

    if (transitionStage === 'fadeOut') {
      const timer = setTimeout(() => {
        setTransitionStage('idle');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  return (
    <>
      <AnimatePresence>
        {transitionStage !== 'idle' &&
          !location.pathname.startsWith('/admin') &&
          !location.pathname.startsWith('/client') &&
          !location.pathname.startsWith('/login') && <LoadingScreen />}
      </AnimatePresence>

      <Suspense fallback={<LoadingScreen />}>
        <Routes location={displayLocation} key={displayLocation.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <ProtectedRoute requiredRole="admin">
                  <AdminProvider>
                    <AdminLayout />
                  </AdminProvider>
                </ProtectedRoute>
              </Suspense>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<ClientList />} />
            <Route path="clients/new" element={<ClientForm />} />
            <Route path="clients/edit/:id" element={<ClientForm />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="projects/:id/board" element={<ProjectBoard />} />
            <Route path="projects/:id" element={<AdminProjectDetail />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="financial" element={<AdminFinancial />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route
            path="/client"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <ProtectedRoute requiredRole="client">
                  <ClientProvider>
                    <ClientLayout />
                  </ClientProvider>
                </ProtectedRoute>
              </Suspense>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="projects" element={<ClientProjects />} />
            <Route path="projects/:id" element={<ClientProjectDetail />} />
            <Route path="services" element={<ClientServices />} />
            <Route path="billing" element={<ClientBilling />} />
          </Route>

          <Route
            path="/change-password"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <ChangePassword />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <ErrorPage
                error={{
                  status: 404,
                  statusText: 'Page Not Found',
                  message: 'The page you are looking for does not exist.',
                }}
              />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

import * as S from '@styles/App.styles';

const App = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/client');
  const isLoginRoute = location.pathname.startsWith('/login');

  return (
    <S.AppLayout>
      <WebGLBackground />
      {!isAdminRoute && !isLoginRoute && <Navbar />}
      <S.Main>
        <ErrorBoundary
          fallback={(error, errorInfo) => (
            <ErrorPage error={{ ...error, stack: errorInfo?.componentStack }} />
          )}
        >
          <AnimatedRoutes />
        </ErrorBoundary>
      </S.Main>
      {!isAdminRoute && !isLoginRoute && <Footer />}
    </S.AppLayout>
  );
};

const AppWrapper = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default AppWrapper;
