import React from "react";
import { Button } from 'reactstrap';
import DeviceTable from "../components/device-table";
import Cookies from 'universal-cookie';

export const Dashboard = () => {
    const cookies = new Cookies();

    return(
        <>
            <h1>Session ID: {cookies.get('session_code')}</h1>
            <DeviceTable />
            <Button color="danger">End Session</Button>
        </>
    )
}

export default Dashboard;