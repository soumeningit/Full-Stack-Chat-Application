import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './Pages/Loginpage';
import Signupage from './Pages/Signupage';
import Home from './Pages/Home';
import OTPForm from './component/OTPForm';
import ChatPage from './Pages/ChatPage';
import ContactUs from './Pages/ContactUs';
import ForgotPassword from './component/ForgotPassword';
import UpdatePassword from './component/UpdatePassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signupage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/otp-send" element={<OTPForm />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/contact-us" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="update-password/:courseId" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
