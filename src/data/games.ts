import { title } from "process";

interface Game{
    id:number,
    title:string,
    type:"which"|"complete"|"link"
}

export const games:Game[] =[
    {
        id:1,
        title:"Which One?",
        type:"which"
    },
    {
        id:2,
        title:"Complete The Word",
        type:"complete"
    },
    {
        id:2,
        title:"Link the Objects",
        type:"link"
    },
]