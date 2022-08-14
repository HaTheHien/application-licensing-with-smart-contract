import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Licence from './components/Licence';

function App() {
  return (
    <>
      <NavBar/>
      <div className='container'>
        <Routes>
          <Route path='/calculator' element={<Main/>}/>
          <Route path='/manage-licence' element={<Licence/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
