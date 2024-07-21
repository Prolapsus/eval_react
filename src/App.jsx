import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ConferenceList from './pages/ConferenceList';
import ConferenceDetail from './pages/ConferenceDetail';
import ConferenceForm from './pages/ConferenceForm';
import AdminDashboard from './pages/AdminDashboard';
import ManageConferences from './pages/ManageConferences';
import ManageUsers from './pages/ManageUsers';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <div className="container mt-5">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardWrapper /></PrivateRoute>} />
                <Route path="/conferences" element={<PrivateRoute><ConferenceList /></PrivateRoute>} />
                <Route path="/conference/:id" element={<PrivateRoute><ConferenceDetail /></PrivateRoute>} />
                <Route path="/admin/dashboard" element={<PrivateRoute adminRequired={true}><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/conferences" element={<PrivateRoute adminRequired={true}><ManageConferences /></PrivateRoute>} />
                <Route path="/admin/conference/create" element={<PrivateRoute adminRequired={true}><ConferenceForm /></PrivateRoute>} />
                <Route path="/admin/conference/edit/:id" element={<PrivateRoute adminRequired={true}><ConferenceForm /></PrivateRoute>} />
                <Route path="/admin/users" element={<PrivateRoute adminRequired={true}><ManageUsers /></PrivateRoute>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
  );
};

const DashboardWrapper = () => {
  const { currentUser } = useAuth();
  return currentUser?.isAdmin ? <Navigate to="/admin/dashboard" /> : <Dashboard />;
};

export default App;
