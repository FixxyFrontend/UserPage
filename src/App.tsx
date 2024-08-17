import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Complaints from './components/Complaints';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import ViewComplaint from './components/ViewComplaint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/complaints" 
          element={
            <PrivateRoute>
              <Complaints />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/viewcomplaint" 
          element={
            <PrivateRoute>
              <ViewComplaint />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
