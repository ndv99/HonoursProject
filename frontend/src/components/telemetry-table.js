import { Col, Row, Container } from "reactstrap";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './loading-spinner.js';
import './../styles/components/telemetry.css';

// const sample_drivers = [
    //     {
    //         Name: "LECLERC",
    //         Initials: "LEC",
    //         FullName: "C. LECLERC",
    //         FirstName: "Charles",
    //         LastName: "Leclerc",
    //         Color: "ed1c24",
    //         Team: "Ferrari",
    //         Num: "16"
    //     },
    //     {
    //         Name: "VERSTAPPEN",
    //         Initials: "VER",
    //         FullName: "M.VERSTAPPEN",
    //         FirstName: "Max",
    //         LastName: "Verstappen",
    //         Color: "1e5bc6",
    //         Team: "Red Bull Racing",
    //         Num: "1"
    //     },
    //     {
    //         Name: "RUSSELL",
    //         Initials: "RUS",
    //         FullName: "G.RUSSELL",
    //         FirstName: "George",
    //         LastName: "Russell",
    //         Color: "6cd3bf",
    //         Team: "Mercedes",
    //         Num: "63"
    //     },
    // ]

const TelemetryTable = () => {

    const [drivers, setDrivers] = useState([])
    const [telemetry, setTelemetry] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")

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
            setDrivers(Object.values(res.data.drivers).sort((a, b) => (a.GridPosition > b.GridPosition) ? 1 : -1))
            setTelemetry(Object.values(res.data.telemetry))
            // console.log(res.data)
            // console.log(drivers)
            setLoading(false)
            // console.log(data)
        })
        .catch((err) => {
            setError(err)
            setLoading(false)
        })
        // setLoading(false)
    }, [])


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
                    <Col style={{width: "5px", flexGrow: 0}}/>
                    <Col>NAME</Col>
                    <Col>GAP</Col>
                    <Col>INT</Col>
                    <Col>LAP</Col>
                    <Col>TYRE</Col>
                </Row>
                {drivers.map((driver, i) => (
                    <Row key={i}>
                        <Col>{i + 1}</Col>
                        <Col style={{textAlign: "right", width: "5px", flexGrow: 0, paddingRight: 0}}>
                            <div className="driverColor" style={{backgroundColor: `#${driver.TeamColor}`}}/>
                        </Col>
                        <Col>{driver.Abbreviation}</Col>
                        <Col>gap</Col>
                        <Col>interval</Col>
                        <Col>laptime</Col>
                        <Col>tyre</Col>
                    </Row>
                ))}
            </Container>
        )
    }
}

export default TelemetryTable;