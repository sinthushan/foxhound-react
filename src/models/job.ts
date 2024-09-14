import { User } from "./user"

export interface Job{
    id: number,
    applicant: User
    title: string,
    company: string,
    applied_date: Date,
    modefied_date: Date,
    stages: [Stage]
}

export interface Stage{
    stage: string,
    round: number,
    comment: string,
}
