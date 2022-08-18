import NavBar from './component/NavBar';
import { Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Licence from './component/Licence';
import './App.css';


export default function App() {
  return (
    <>
      <NavBar/>
      <div className='container'>
        <Routes>
          <Route path='/todo' element={<Main/>}/>
          <Route path='/manage-licence' element={<Licence/>}/>
        </Routes>       
      </div>
    </>
  )
}
