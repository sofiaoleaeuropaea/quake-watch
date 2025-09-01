import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <main>
          <Routes>
            <Route path='/quake-watch' element={<Dashboard/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
