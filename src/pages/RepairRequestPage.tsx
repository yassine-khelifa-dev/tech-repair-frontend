import {  useState, type ReactNode } from "react";

type Props = {
   valstart: string ,
   children:  ReactNode | ReactNode[]
}

function RepairRequest({valstart, children=[]}: Props){

    const [count, setCount] = useState(0)
    const repairState = [
        { 'id': 1, value: 'waiting_device'},
        { 'id': 2, value: 'received'},
        { 'id': 3, value: 'diagnosis'},
        { 'id': 4, value: 'waiting_parts'},
        { 'id': 5, value: 'in_progress'},
        { 'id': 6, value: 'ready'},
        { 'id': 7, value: 'delivered'},
        { 'id': 8, value: 'cancelled'},
    ];

    const myRepairStateList=  repairState.map((s) => {
       return <li key={s.id}>{s.value}</li>;
    });

    function inc(){
        setCount(count + 1)
    }

    return <>
    <h1>RepairRequest - {count} - {valstart}</h1>

    <ul className="max-w-md space-y-1 text-body list-disc list-inside">
        {myRepairStateList}
    </ul>


    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={inc}>increment</button>

    {children}
    </>;
}

export default RepairRequest;