import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProgressBoard from "./components/ProgressBoard/ProgressBoard";
import Profile from "./pages/Profile";
import { useContext, useEffect, useState} from "react";
import Splash from "./pages/Splash";


import Login from "./pages/Login";
import Register from "./pages/Register";
import { checkifloggedIn, UserContext } from "./services/user";
import { JobProvider } from "./services/jobsService";




const App =  () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {user, setUser} = useContext(UserContext)
  
  useEffect(() => {
    checkifloggedIn().then(
      (applicant) => {
        if (applicant){
          setUser(applicant)
          setIsLoggedIn(true)
        }
      }
    )
  }, [])
  
 

  return(
    <JobProvider> 
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard/>: <Navigate replace to={"/splash"}/>}>
        <Route path="/" element={<ProgressBoard/>} />
        <Route path="/profile" element={ <Profile/>} />
      </Route>
      <Route path="/splash" element={!isLoggedIn ?<Splash/>: <Navigate replace to={"/"}/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </JobProvider>
  )
}

export default App;