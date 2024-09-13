import { User } from "../models/user"
import instance from "./instance"



const checkifloggedIn = async () => {
    let url = 'applicant/'
    const resp = await instance.get(url)
    if (resp.status === 200){
       const  user: User = resp.data
       return user 
    }
    return null
}

export default checkifloggedIn