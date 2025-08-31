import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <>
      <BrowserRouter>
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
