import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProgressBoard from "./components/ProgressBoard/ProgressBoard";
import Profile from "./pages/Profile";
import { useState } from "react";
import Splash from "./pages/Splash";

import checkifloggedIn from "./services/user";
import Login from "./pages/Login";
import Register from "./pages/Register";




const App =  () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  checkifloggedIn().then(
    (user) => {
      if (user){
        setIsLoggedIn(true)
      }
    }
  )

  return(
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard/>: <Navigate replace to={"/splash"}/>}>
        <Route path="/" element={<ProgressBoard/>} />
        <Route path="/profile" element={ <Profile/>} />
      </Route>
      <Route path="/splash" element={!isLoggedIn ?<Splash/>: <Navigate replace to={"/"}/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App;