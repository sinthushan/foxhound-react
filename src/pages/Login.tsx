import { SyntheticEvent } from "react"
import auth from "../services/auth"
import logo from '../assets/foxhound.png'
import { useNavigate  } from 'react-router-dom';
import './login.css'
const Login = () => {
    const navigate = useNavigate()
    const login = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };
        auth.login(target.username.value, target.password.value).then((user) => {
            if (user){
                navigate('/')
            }
        })
        

    }
    return (
        <div className="container">
            <header>
            <img className="logo-image" src={logo} alt="foxhound logo"/>
            </header>
            <form id="loginForm" onSubmit={login}>
                <div className="form-control">
                    <label htmlFor="username">username  :</label>
                    <input id="username" name="username"/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">password  :</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <div className="form-control">
                    <button  type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default Login