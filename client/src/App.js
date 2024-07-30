import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './Pages/Loginpage';
import Signupage from './Pages/Signupage';
import Home from './Pages/Home';
import OTPForm from './component/OTPForm';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signupage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/otp-send" element={<OTPForm />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
