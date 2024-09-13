import { Link } from 'react-router-dom'
import logo from '../assets/foxhound.png'
import './splash.css'
const Splash = () => {
    return(
        <main className="splash">
            <header className='header'>
                <h1>FoxHound</h1>
                <div className="user-section">
                    <Link to="/login" >Log In</Link>
                   <Link to="/register"><button id="getStarted" >Get Started</button></Link>
                </div>
            </header>
            <section className='main-splash'>
                <img className="logo-image" src={logo} alt="foxhound logo"/>
                <article className="call-to-action">
                    <h2>MONITOR YOUR JOB HUNT FROM APPLICATION TO OFFER!!</h2>
                    <div >
                        <div>Start tracking your applications now!</div> 
                        <Link to="/register"><button id="getStarted" >Get Started</button></Link>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Splash