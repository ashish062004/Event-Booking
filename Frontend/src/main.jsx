// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact';
import Signup from './components/Auth/Signup.jsx';
import Signin from './components/Auth/Signin.jsx';
import EventList from './components/Event/EventList.jsx';
import EventDetails from './components/Event/EventDetails.jsx';
import CreateEvent from './components/Admin/CreateEvent.jsx';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin/events" element={<CreateEvent />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
