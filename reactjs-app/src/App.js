import Home from './pages/Home';
import Login  from './pages/Login'
import Signup from './pages/Signup';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import Edit from './pages/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='edit/:id' element={<Edit />}/>
          <Route path='user/:id' element={<Detail />} />
          <Route path='login' element={<Login />} /> 
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
