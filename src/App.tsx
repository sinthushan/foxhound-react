import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProgressBoard from "./components/ProgressBoard/ProgressBoard";
import Profile from "./pages/Profile";
import EmailLink from "./pages/Link";
import { useContext, useEffect } from "react";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { checkifloggedIn, UserContext } from "./services/user";

const App = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    checkifloggedIn()
      .then((applicant) => {
        if (applicant) {
          setUser(applicant);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, []);
  const isLoggedIn = user ? true : false;

  return (
    <Routes>
      <Route
        path=""
        element={
          isLoggedIn ? <Dashboard /> : <Navigate replace to={"/splash"} />
        }
      >
        <Route path="/" element={<ProgressBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/link" element={<EmailLink />} />
      </Route>
      <Route
        path="/splash"
        element={!isLoggedIn ? <Splash /> : <Navigate replace to={"/"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
