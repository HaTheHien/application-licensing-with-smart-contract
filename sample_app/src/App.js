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
      <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
        <Routes>
          <Route path='/' element={<Licence/>}/>
        </Routes></div>
      </div>
    </>
  );
}

export default App;
