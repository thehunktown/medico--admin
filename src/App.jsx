import React, { useContext } from 'react'
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route,Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard'
import AllEnquiry from './pages/Admin/AllEnquiry'
import AddStaff from './pages/Admin/AddStaff';
import StaffList from './pages/Admin/StaffList'
const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-enquiry' element={<AllEnquiry/>}/>
          <Route path='/add-staff' element={<AddStaff/>}/>
          <Route path='/staff-list' element={<StaffList/>}/>


        </Routes>
      </div>
    </div>
  )  :(
    <>
     < Login/>
     <ToastContainer />
    </>
  )
}

export default App
