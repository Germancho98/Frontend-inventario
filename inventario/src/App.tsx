// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterForm from './components/registerForm';
import UserView from "./components/userView";
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

Modal.setAppElement('#root');

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/user" element={<UserView />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;