import {React, useEffect} from "react";
import axios from "axios";
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import DeviceTable from "../components/device-table";
import Cookies from 'universal-cookie';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const Dashboard = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    
    function handleSubmit(){
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";

        // refresh_list()
        const session_id = cookies.get('session_id')
        console.log(session_id)
        axios.delete('/api/sessions/' + session_id + '/')
        .then((res) => {
            console.log("Session deleted.")
            cookies.remove('session_code')
            cookies.remove('entitlementToken')

            navigate('../', {replace: true})
        })
        .catch((err) => console.log(err));
    }

    return(
        <>
            <h1>Session ID: {cookies.get('session_code')}</h1>
            <DeviceTable />
            <Button color="danger" type='submit' onClick={handleSubmit}>End Session</Button>
        </>
    )
}

export default Dashboard;