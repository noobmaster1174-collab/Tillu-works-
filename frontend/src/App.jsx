import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Quote from './pages/Quote';
import Contact from './pages/Contact';
import About from './pages/About';
import Orders from './pages/Orders';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Poppins, sans-serif', borderRadius: '16px', fontSize: '14px', fontWeight: '500' },
          success: { iconTheme: { primary: '#FF6B00', secondary: '#fff' } },
        }}
      />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </BrowserRouter>
  );
}
