import { linkToGMail } from "../services/user"

const EmailLink = () => {
    const linkAccount = () => {
        linkToGMail().then((data) => {
            console.log(data)
        })
    }
    
    return(
        <div>
            <button onClick={linkAccount}>Link Account</button>
        </div>
    )
}

export default EmailLink