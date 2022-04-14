import { Col, Row, Container } from "reactstrap";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './loading-spinner.js';
import DriverRow from './driver-row';
import './../styles/components/telemetry.css';

const TelemetryTable = () => {

    const [drivers, setDrivers] = useState([])
    const [telemetry, setTelemetry] = useState()
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const track_status_data = {
        "1": "Green flag",
        "2": "Yellow flag",
        "3": "",
        "4": "Safety Car",
        "5": "Red Flag",
        "6": "Virtual Safety Car",
        "7": "Virtual Safety Car Ending"
    }

    // console.log("isLoading: " + isLoading)

    useEffect(() => {
        axios.get(
            "/api/telemetry/",
            {headers: {
                'year': '2019',
                'gp': 'Italian',
                'identifier': 'r'
            }})
        .then((res) => {
            let driverlist = Object.values(res.data.drivers).sort((a, b) => (sortDriversByGridPos(a,b)))
            driverlist = movePLStartersToBack(driverlist)

            setDrivers(driverlist)
            setTelemetry(telemetry => (res.data.telemetry))
            setLoading(false)

            console.log(telemetry)
        })
        .catch((err) => {
            setError(err)
            setLoading(false)
        })
        // setLoading(false)
    }, [])

    const sortDriversByGridPos = (a, b) => {
        if (a.GridPosition > b.GridPosition){
            return 1
        } else {
            return -1
        }
    }

    const movePLStartersToBack = (driverlist) => {
        let incorrectOrder = true;
        while (incorrectOrder){
            let pole = driverlist[0]
            // console.log(pole)
            if (pole.GridPosition === 0){
                let lastplacepos = driverlist[driverlist.length - 1].GridPosition
                pole.GridPosition = lastplacepos + 1
                driverlist.push(driverlist.splice(0, 1)[0])
            } else {
                incorrectOrder = false;
            }
        }

        return driverlist
    }


    if (isLoading){
        // console.log("isLoading is true.")
        return(
            <LoadingSpinner />
        )
    } else if (error){
        return(
            <div>{error}</div>
        )
    } else { 
        // console.log("React thinks isLoading is false. Actual state: " + isLoading)
        return(
            <Container>
                <Row>
                    <Col>POS</Col>
                    <Col style={{width: "5px", flexGrow: 0, paddingRight: 0}}/>
                    <Col>NAME</Col>
                    <Col>GAP</Col>
                    <Col>INT</Col>
                    <Col>LAP</Col>
                    <Col>TYRE</Col>
                </Row>
                {drivers.map((driver, i) => (
                    <Row key={i}>
                        <Col>{i + 1}</Col>
                        <DriverRow driver={driver}/>
                    </Row>
                    
                ))}
            </Container>
        )
    }
}

export default TelemetryTable;