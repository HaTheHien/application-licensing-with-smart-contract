import React, { useCallback, useEffect, useState } from "react";
import Application2 from "../contracts/Application2.json"
import getWeb3 from "../utils/getWeb3";
import ReactLoading from "react-loading";
import Main from '../components/Main';


const APP_CONTRACT_ADDRESS = "0x1560Bba3F4b32db444ED247D85D32938dA890244";

export default function Licence(){
    const [haveLicense,setHaveLicense]=useState(null);
    useEffect(()=>{
        const load = async () =>{
            try {
                const web3= await getWeb3()
                const accounts = await web3?.eth.getAccounts();
                const appContract = await new web3.eth.Contract(Application2.abi, APP_CONTRACT_ADDRESS);
                var check = await appContract.methods.checkLicense(accounts[0]).call({from: accounts[0]})
                setHaveLicense(check);
            } catch (error) {
                
            }
        }
        load();
    },[]);

    return (
        <div className="licence">
            <div className="licence-notif">
                {haveLicense == null ?  <ReactLoading type="spin" color="#0000FF"
        height={100} width={50} /> :
                haveLicense?  <Main/> : <div>You don't have license.</div>}
            </div>
        </div>
    )
}