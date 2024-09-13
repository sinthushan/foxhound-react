import instance from './instance';


const getJobs = async () => {
    let url = 'jobs/'
    const resp = await instance.get(url)
    console.log(resp)
}

const addJob = async (title: string, company: string) => {
    let url = 'jobs/'
    const resp = await instance.post(url, {
        title: title, 
        company: company
    })
    console.log(resp)
}

export default {getJobs, addJob}