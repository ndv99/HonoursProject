import  { useState, useEffect } from "react";
import TelemetryTable from '../components/telemetry-table';
import TwitterFeed from "../components/twitter-feed";
import RedditFeed from '../components/reddit-feed';
import { Waiting } from '../components/waiting.js';
import axios from "axios";
import LoadingSpinner from '../components/loading-spinner'
import { Container, Row, Col } from "reactstrap";
import Cookies from "universal-cookie";

export const SecondScreen = () => {

    // this will later be changed to use props based on whatever the control device chooses to do
    const [reddit, setReddit] = useState(false)
    const [twitter, setTwitter] = useState(false)
    const [showTelemetry, setShowTelemetry] = useState(false)
    const [waiting, setWaiting] = useState(true)

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [drivers, setDrivers] = useState([])
    const [telemetry, setTelemetry] = useState()

    const [lap, setLap] = useState(1)
    const [totalLaps, setTotalLaps] = useState(2)
    const [leadingDriver, setLeadingDriver] = useState()
    const [raceFinished, setRaceFinished] = useState(false)

    const [before, setBefore] = useState(0)
    const [after, setAfter] = useState(0)

    const [counter, setCounter] = useState(0)

    const cookies = new Cookies()
    
    useEffect(() => {
        // console.log(`Initial state of raceFinished: ${raceFinished}`)
        // console.log("This is happening")
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
            setLeadingDriver(driverlist[0])

            const repairedTelemetry = calcMissingTimes(res.data.telemetry)
            
            const total_laps = calcTotalLaps(driverlist, repairedTelemetry)
            setTotalLaps(totalLaps => total_laps) // i hate the way useEffect/useState makes me use this syntax

            for (const driver in driverlist){
                // console.log(driverlist[driver])
                driverlist[driver].CurrentLapStartDate = Object.values(repairedTelemetry[parseInt(driverlist[driver].DriverNumber)].LapStartDate)[0]
                driverlist[driver].CurrentLapStart = Object.values(repairedTelemetry[parseInt(driverlist[driver].DriverNumber)].LapStartTime)[0]
                driverlist[driver].CurrentSectorStart = Object.values(repairedTelemetry[parseInt(driverlist[driver].DriverNumber)].Sector1SessionTime)[0]
                driverlist[driver].CurrentSector = 1
                driverlist[driver].CurrentLap = getKeyByValue(repairedTelemetry[parseInt(driverlist[driver].DriverNumber)].LapNumber, 1)

                // console.log(driverlist[driver])
            }

            setBefore(driverlist[0].CurrentLapStartDate)
            setAfter(Object.values(repairedTelemetry[parseInt(driverlist[0].DriverNumber)].LapStartTime)[1])
            
            setDrivers(driverlist)
            setTelemetry(telemetry => (repairedTelemetry))
            setLoading(false)

            console.log("Finished loading driver data.")
        })
        .catch((err) => {
            console.log(err)
            setError(err)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setCounter(counter + 1), 2000)

        if (!isLoading) {
            console.log('device fetch is happening')
    
            axios.get(`/api/sessions/${cookies.get('session_id')}`)
            .then((res) => {
    
                // console.log(`Device ID in cookie:`)
                // console.log(cookies.get('device_id'))
    
                const devices = res.data.devices
    
                // console.log(devices)
    
                let device;
    
                for (var d in devices) {
                    // console.log(`device ID in list: ${devices[d].id}`)
                    // console.log(`device ID in cookie: ${cookies.get('device_id')}`)
                    if (devices[d].id === parseInt(cookies.get('device_id'))){
                        console.log("we've got a match")
                        device = devices[d]
                        break
                    }
                }
    
                // console.log(device)
    
                if (device) {
                    console.log(`Device mode: ${device.mode}`)
                    if (device.mode === 0) {
                        setReddit(false)
                        setShowTelemetry(false)
                        setWaiting(true)
                    } else if (device.mode === 1) {
                        setReddit(false)
                        setShowTelemetry(true)
                        setWaiting(false)
                    } else if (device.mode === 2) {
                        setReddit(true)
                        setShowTelemetry(false)
                        setWaiting(false)
                    } else if (device.mode === 3) {
                        setReddit(true)
                        setTelemetry(true)
                        setWaiting(false)
                    }
                }
                // console.log(res.data)
            })
            .catch((err) => console.log(err))
            }
        return () => clearTimeout(timer)
    }, [counter])

    useEffect(() => {
        sortDriversByLapStartTimes()
        setDriverCurrentLapStarts()
        if (lap > 1) {
            setAfter(before)
            setBefore(drivers[0].CurrentLapStartDate)
        }

        if (lap === totalLaps) {
            setRaceFinished(true)
            let temp = raceFinished
            console.log("Race finished. State: " + temp)
            setDrivers(drivers => drivers.sort((a,b) => {
                if (a.Position > b.Position) {
                    return 1
                } else {
                    return -1
                }
            }))
        }
    },[lap])

    const calcTotalLaps = (driverlist, telem) => {
        
        let winner = driverlist.find(driver => driver.Position === 1)
        return Object.keys(telem[parseInt(winner.DriverNumber)].LapTime).length
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }      

    const sortDriversByCurrentSectorStartTimes = () => {
        setDrivers(drivers => drivers.sort((a, b) => {
            if (a.CurrentSectorStart > b.CurrentSectorStart || a.CurrentSectorStart == null) {
                return 1
            } else {
                return -1
            }
        }))
    }

    const setDriverCurrentLapStarts = () => {
        for (const d in drivers) {
            drivers[d].CurrentLapStart = Object.values(telemetry[parseInt(drivers[d].DriverNumber)].LapStartTime)[lap-1]
        }
    }

    const sortDriversByLapStartTimes = () => {
        setDrivers(drivers => drivers.sort((a, b) => {
            let aDriverNumber = parseInt(a.DriverNumber)
            let bDriverNumber = parseInt(b.DriverNumber)

            let aLapStartTime = Object.values(telemetry[aDriverNumber].LapStartTime)[lap-1]
            let bLapStartTime = Object.values(telemetry[bDriverNumber].LapStartTime)[lap-1]
            if (aLapStartTime > bLapStartTime) {
                return 1
            } else {
                return -1
            }
        }))
    }

    const calcMissingTimes = (telem) => {
        for (const driver in telem){
            const lap1starttime = telem[driver].LapStartTime[Object.keys(telem[driver].LapStartTime)[0]]
            const lap2starttime = telem[driver].LapStartTime[Object.keys(telem[driver].LapStartTime)[1]]

            const laptime = lap2starttime - lap1starttime

            const s2time = telem[driver].Sector2Time[Object.keys(telem[driver].Sector2Time)[0]]
            const s3time = telem[driver].Sector3Time[Object.keys(telem[driver].Sector3Time)[0]]
            const s1time = laptime - s2time - s3time

            telem[driver].LapTime[Object.keys(telem[driver].LapTime)[0]] = laptime
            telem[driver].Sector1Time[Object.keys(telem[driver].Sector1Time)[0]] = s1time
            telem[driver].Sector1SessionTime[Object.keys(telem[driver].Sector1SessionTime)[0]] = lap1starttime + s1time
        }
        return telem
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
            <>
                {waiting ? <Waiting /> : 
                    <>
                        <h1>2019 Italian Grand Prix - Monza</h1>
                        <h2>Lap {lap}/{totalLaps}</h2>
                        { showTelemetry && reddit ? 
                            <Container style={{margin: 0, maxWidth: '100%'}}>
                                <Row>
                                    <Col style={{flexGrow: 5}}>
                                        <TelemetryTable showTelemetry={showTelemetry} drivers={drivers} telemetry={telemetry} lap={lap} isLoading={isLoading} error={error} leadingDriver={leadingDriver} raceFinished={raceFinished} setLap={setLap} sortDriversByCurrentSectorStartTimes={sortDriversByCurrentSectorStartTimes}/>
                                    </Col>
                                    <Col style={{flexGrow: 2}}>
                                        <RedditFeed after={after} before={before}/>
                                    </Col>
                                </Row>
                            </Container>
                        :
                            <>
                                <TelemetryTable showTelemetry={showTelemetry} drivers={drivers} telemetry={telemetry} lap={lap} isLoading={isLoading} error={error} leadingDriver={leadingDriver} raceFinished={raceFinished} setLap={setLap} sortDriversByCurrentSectorStartTimes={sortDriversByCurrentSectorStartTimes}/>
                                {reddit ? <RedditFeed after={after} before={before}/> : <></>}
                            </>

                        }
                    </>
                }
            </>
        )
    }
}

export default SecondScreen;