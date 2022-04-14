import { Col, Row, Container } from "reactstrap";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LoadingSpinner from './loading-spinner.js';
import DriverRow from './driver-row.js';
import './../styles/components/telemetry.css';

const TelemetryTable = () => {

    const [drivers, setDrivers] = useState([])
    const [telemetry, setTelemetry] = useState()
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [counter, setCounter] = useState(0)
    const [lap, setLap] = useState(0)

    const track_status_data = {
        "1": "Green flag",
        "2": "Yellow flag",
        "3": "",
        "4": "Safety Car",
        "5": "Red Flag",
        "6": "Virtual Safety Car",
        "7": "Virtual Safety Car Ending"
    }

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

            calcMissingTimes()

            // console.log(telemetry)

            setLoading(false)
        })
        .catch((err) => {
            setError(err)
            setLoading(false)
        })
    }, [])

    useEffect(() =>{
        console.log("Current lap: " + lap)
        // console.log("Current counter: " + counter)
        if (lap < 40) {
            const timer = setTimeout(() => setCounter(counter + 1), 1000)
            
            if (isLoading === false){
                if (lap > 0) {
                    // sortDriversByLapStartTimes()

                    // var driversWithTimes = {}
                    for (var d in drivers){
                        let driver = drivers[d]
                        let driverNum = parseInt(driver.DriverNumber)
                        let driverLap = getKeyByValue(telemetry[driverNum].LapNumber, lap)
                        let lapStart = telemetry[driverNum].LapStartTime[driverLap]
                        driver.CurrentLapStart = lapStart

                        // driversWithTimes[lapStart] = driverNum
                    }
                    sortDriversByLapStartTimes()
                    // drivers.sort((a, b) => a.CurrentLapStart - b.CurrentLapStart)
                    // console.log(driversWithTimes)
                }
                for (var d in drivers){
                    console.log(d)
                    let driver = drivers[d]
                    console.log(`Driver ${driver.DriverNumber} lap start time on lap ${lap}: ${driver.CurrentLapStart}`)
                }
                console.log(drivers)

                setLap(lap + 1);
            }

            return () => clearTimeout(timer);
        }
    }, [counter])

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }      

    const sortDriversByLapStartTimes = () => {
        setDrivers(drivers => drivers.sort((a, b) => {
            // console.log(a)
            if (a.CurrentLapStart > b.CurrentLapStart) {
                return 1
            } else {
                return -1
            }
        }))
    }

    const calcMissingTimes = () => {
        for (const driver in telemetry){
            const lap1starttime = telemetry[driver].LapStartTime[Object.keys(telemetry[driver].LapStartTime)[0]]
            const lap2starttime = telemetry[driver].LapStartTime[Object.keys(telemetry[driver].LapStartTime)[1]]

            const laptime = lap2starttime - lap1starttime

            const s2time = telemetry[driver].Sector2Time[Object.keys(telemetry[driver].Sector2Time)[0]]
            const s3time = telemetry[driver].Sector3Time[Object.keys(telemetry[driver].Sector3Time)[0]]
            const s1time = laptime - s2time - s3time

            telemetry[driver].LapTime[Object.keys(telemetry[driver].LapTime)[0]] = laptime
            telemetry[driver].Sector1Time[Object.keys(telemetry[driver].Sector1Time)[0]] = s1time
            telemetry[driver].Sector1SessionTime[Object.keys(telemetry[driver].Sector1SessionTime)[0]] = lap1starttime + s1time
        }
    }

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
        return(
            <LoadingSpinner />
        )
    } else if (error){
        return(
            <div>{error}</div>
        )
    } else { 
        return(
            <Container>
                <Row>
                    <Col>POS</Col>
                    <Col style={{width: "5px", flexGrow: 0, paddingRight: 0}}/>
                    <Col>NAME</Col>
                    <Col>GAP</Col>
                    <Col>INT</Col>
                    <Col>S1</Col>
                    <Col>S2</Col>
                    <Col>S3</Col>
                    <Col>LAP</Col>
                    <Col>TYRE</Col>
                </Row>
                {drivers.map((driver, i) => (
                    <Row key={i}>
                        <Col>{i + 1}</Col>
                        <DriverRow driver={driver} telemetry={telemetry} lap={lap} setLap={setLap}/>
                    </Row>
                    
                ))}
            </Container>
        )
    }
}

export default TelemetryTable;