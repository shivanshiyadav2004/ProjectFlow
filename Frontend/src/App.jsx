import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import StudentDashboard from './Pages/StudentDashboard'
import TeacherDashboard from './Pages/TeacherDashboard'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/studentdashboard' element={<StudentDashboard/>}/>
         <Route path='/teacherdashboard' element={<TeacherDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App