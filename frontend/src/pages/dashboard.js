import {React} from "react";
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
    var session_list = [];

    function handleSubmit(){
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";

        refresh_list()
        const session_id = get_session_id(cookies.get('session_code'))
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

    function setSessionList(newlist){
        session_list=newlist;
        // console.log(session_list)
    }

    function get_session_id(session_code){
        for (var i=0; i < session_list.length; i++) {
            if (session_list[i].join_code === session_code) {
                return session_list[i].id;
            }
        }
    }

    function refresh_list () {
        axios 
        .get("/api/sessions")
        .then((res) => setSessionList(res.data))
        .catch((err) => console.log(err)); 
    }

    refresh_list()

    return(
        <>
            <h1>Session ID: {cookies.get('session_code')}</h1>
            <DeviceTable />
            <Button color="danger" type='submit' onClick={handleSubmit}>End Session</Button>
        </>
    )
}

export default Dashboard;