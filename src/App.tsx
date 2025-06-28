import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import PatientDashboard from './pages/Dashboard/PatientDashboard';

// Lazy load other pages for better performance
const DoctorDashboard = React.lazy(() => import('./pages/Dashboard/DoctorDashboard'));
const AdminDashboard = React.lazy(() => import('./pages/Dashboard/AdminDashboard'));
const BookAppointment = React.lazy(() => import('./pages/Patient/BookAppointment'));
const PatientAppointments = React.lazy(() => import('./pages/Patient/PatientAppointments'));
const PatientPrescriptions = React.lazy(() => import('./pages/Patient/PatientPrescriptions'));
const DoctorAppointments = React.lazy(() => import('./pages/Doctor/DoctorAppointments'));
const DoctorPrescriptions = React.lazy(() => import('./pages/Doctor/DoctorPrescriptions'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const FeaturesPage = React.lazy(() => import('./pages/FeaturesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main>
              <React.Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                  </div>
                }
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/about" element={<AboutPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Patient Routes */}
                  <Route
                    path="/patient"
                    element={
                      <ProtectedRoute requiredRole="patient">
                        <PatientDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/book-appointment"
                    element={
                      <ProtectedRoute requiredRole="patient">
                        <BookAppointment />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/appointments"
                    element={
                      <ProtectedRoute requiredRole="patient">
                        <PatientAppointments />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/prescriptions"
                    element={
                      <ProtectedRoute requiredRole="patient">
                        <PatientPrescriptions />
                      </ProtectedRoute>
                    }
                  />

                  {/* Doctor Routes */}
                  <Route
                    path="/doctor"
                    element={
                      <ProtectedRoute requiredRole="doctor">
                        <DoctorDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doctor/appointments"
                    element={
                      <ProtectedRoute requiredRole="doctor">
                        <DoctorAppointments />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doctor/prescriptions"
                    element={
                      <ProtectedRoute requiredRole="doctor">
                        <DoctorPrescriptions />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </React.Suspense>
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;