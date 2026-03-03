import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ScanDetailPage from './pages/ScanDetailPage';
import AppLayout from './components/layout/AppLayout';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Login is standalone (no sidebar) */}
              <Route
                path="/"
                element={
                  <PageTransition>
                    <LoginPage />
                  </PageTransition>
                }
              />

              {/* App routes with sidebar layout */}
              <Route
                path="/dashboard"
                element={
                  <AppLayout>
                    <PageTransition>
                      <DashboardPage />
                    </PageTransition>
                  </AppLayout>
                }
              />
              <Route
                path="/scan/:id"
                element={
                  <AppLayout>
                    <PageTransition>
                      <ScanDetailPage />
                    </PageTransition>
                  </AppLayout>
                }
              />

              {/* Catch-all redirect to login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
