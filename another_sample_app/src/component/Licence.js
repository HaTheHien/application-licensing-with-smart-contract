import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";

export default function Licence(){
    const [accounts,setAccounts]=useState();
    useEffect(()=>{
        const load = async () =>{
            const web3=new Web3(Web3.givenProvider || "http://localhost:7545"
                //"http://localhost:8575"
            );
            const accounts=await web3.eth.requestAccounts();
            console.log(web3);
            setAccounts(accounts[0]);
        }
        load();
    },[]);

    const handleLoadLicence = useCallback(async ()=>{
        if (!window.ethereum)
            alert("PLEASE ACTIVATE METAMASK");
        else{
            const accs=await window.ethereum.request({
                method:"eth_requestAccounts"
            });
            console.log(accs[0]);
        }
    },[]);

    return (
        <div className="licence">
            <div className="licence-notif">
                {accounts? accounts : <div>You don't have any licences.</div>}
                

            </div>
            <button onClick={handleLoadLicence}>Load Licence</button>
        </div>
    )
}