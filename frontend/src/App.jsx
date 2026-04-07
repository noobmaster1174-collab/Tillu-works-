import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';
import SessionTimeoutWarning from './components/SessionTimeoutWarning';
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Quote from './pages/Quote';
import Contact from './pages/Contact';
import About from './pages/About';
import Orders from './pages/Orders';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import IDCardDesigner from './pages/IDCardDesigner';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Listens for auth events (timeout, expiry) and shows toasts
function AuthEventListener() {
  useEffect(() => {
    const onLogout = (e) => {
      const reason = e.detail?.reason;
      if (reason === 'idle')
        toast('Session ended due to inactivity.', { icon: '⏱️', duration: 5000 });
      else if (reason === 'expired')
        toast('Your session has expired. Please sign in again.', { icon: '🔒', duration: 5000 });
    };
    const onWarning = () => {
      toast('You will be logged out in 60 seconds due to inactivity.', { icon: '⚠️', duration: 4000 });
    };
    window.addEventListener('auth:logout', onLogout);
    window.addEventListener('auth:idle-warning', onWarning);
    return () => {
      window.removeEventListener('auth:logout', onLogout);
      window.removeEventListener('auth:idle-warning', onWarning);
    };
  }, []);
  return null;
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { fontFamily: 'Poppins, sans-serif', borderRadius: '16px', fontSize: '14px', fontWeight: '500' },
              success: { iconTheme: { primary: '#FF6B00', secondary: '#fff' } },
            }}
          />
          <AuthEventListener />
          <Navbar />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/product/id-cards" element={<IDCardDesigner />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
          <ScrollToTop />
          <SessionTimeoutWarning />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
  );
}
