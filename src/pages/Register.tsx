import { SyntheticEvent, useContext } from "react"
import auth from "../services/auth"
import logo from '../assets/foxhound.png'
import { useNavigate } from "react-router-dom"
import './register.css'
import { UserContext } from "../services/user"

const Register = () => {
    const {setUser} = useContext(UserContext)    
    const navigate = useNavigate()
    const register = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
        const target = event.target as typeof event.target & {
            username: { value: string };
            email: { value: string };
            password: { value: string };
            confirmpassword: { value: string };
        };
        auth.register(target.username.value,target.email.value, target.password.value, target.confirmpassword.value).then((user) => {
            if (user){
                setUser(user)
                navigate('/')
            }
        })
    }
    return (
        <div className="registerComponent">
            <header>
                <img className="logo-image" src={logo} alt="foxhound logo"/>
            </header>
                       
            <form id="regiterForm" onSubmit={register}>
                <span className="call-to-action">Register today for free to track your job applications!</span>
                <div className="form-control">
                    <label htmlFor="username">username  :</label>
                    <input id="username" name="username"/>
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email  :</label>
                    <input id="email" name="email"/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">password  :</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <div className="form-control">
                    <label htmlFor="confirmpassword">confirm password  :</label>
                    <input type="password" id="confirmpassword" name="confirmpassword"/>
                </div>
                <div className="form-control">
                    <button type="submit"> Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register