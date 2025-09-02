import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
