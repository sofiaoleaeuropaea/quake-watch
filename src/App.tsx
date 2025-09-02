import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar/>
        <main>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
