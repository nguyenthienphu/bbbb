import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TripName from './components/TripName';

function App() {
  return (
    <BrowserRouter>
      <Headers>
        <Container>
          <Routes>
            <Route path='/' element={<TripName />} />
          </Routes>
        </Container>
      </Headers>
    </BrowserRouter>
  );
}

export default App;
