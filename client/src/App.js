import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import "./sb-admin-2.min.css";
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Userlist from './Userlist';
import Portal from './Portal';
import UserCreate from './UserCreate';
import UserView from './UserView';
import UserEdit from './UserEdit';
import Selektorlist from './Selektort/SelektorList';
import SelektorCreate from './Selektort/SelektorCreate';
import SelektorEdit from './Selektort/SelektorEdit';
import SelektorDelete from './Selektort/SelektorDelete';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/portal' element={<Portal />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user-list' element={<Userlist />} />
          <Route path='create-user' element={<UserCreate />} />
          <Route path='user-view/:id' element={<UserView />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          <Route path='selektor-list' element={<Selektorlist/>}/>
          <Route path='selektor-create' element={<SelektorCreate/>}/>
          <Route path='selektor-edit/:id' element={<SelektorEdit/>}/>
          <Route path='selektor-delete/:id' element={<SelektorDelete/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
