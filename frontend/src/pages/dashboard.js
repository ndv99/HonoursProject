import React from "react";
import { Button } from 'reactstrap';
import DeviceTable from "../components/device-table";

export const Dashboard = () => {
    return(
        <>
            <h1>Session ID: [session ID goes here]</h1>
            <DeviceTable />
            <Button color="danger">End Session</Button>
        </>
    )
}

export default Dashboard;