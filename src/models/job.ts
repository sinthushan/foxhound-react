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
    id: number,
    stage: string,
    round: number,
    comment: string,
}

type STAGEMAPPING = {
    [key: string]: string;
};

export const STAGEMAP: STAGEMAPPING = {
    AP:"Applied",
    IN:"Interview",
    RE:"Rejected",
    OF:"Offer"
}
