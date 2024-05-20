import './App.css';
import SignUp from './Signup.js'; // Corrected import path for SignUp
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Imported BrowserRouter as Router and corrected Routes import
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

