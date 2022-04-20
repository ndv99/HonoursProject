import  { useState, useEffect } from "react";
import TelemetryTable from '../components/telemetry-table';
import TwitterFeed from "../components/twitter-feed";
import RedditFeed from '../components/reddit-feed';
import { Waiting } from '../components/waiting.js';
import axios from "axios";
import LoadingSpinner from '../components/loading-spinner'

export const SecondScreen = () => {

    // this will later be changed to use props based on whatever the control device chooses to do
    const [reddit, setReddit] = useState(false)
    const [twitter, setTwitter] = useState(false)
    const [showTelemetry, setShowTelemetry] = useState(true)
    const [waiting, setWaiting] = useState(false)

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [drivers, setDrivers] = useState([])
    const [telemetry, setTelemetry] = useState()

    const [counter, setCounter] = useState(0)
    const [lap, setLap] = useState(0)
    
    useEffect(() => {
        console.log("This is happening")
        if (showTelemetry){
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

                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })}
    }, [showTelemetry])

    useEffect(() =>{
        if (showTelemetry){
            if (lap < 40) {
                const timer = setTimeout(() => setCounter(counter + 1), 1000)
                
                if (isLoading === false){
                    if (lap > 0) {
                        for (var d in drivers){
                            let driver = drivers[d]
                            let driverNum = parseInt(driver.DriverNumber)
                            let driverLap = getKeyByValue(telemetry[driverNum].LapNumber, lap)
                            let lapStart = telemetry[driverNum].LapStartTime[driverLap]
                            driver.CurrentLapStart = lapStart
                        }
                        sortDriversByLapStartTimes()
                    }

                    setLap(lap + 1);
                }

                return () => clearTimeout(timer);
            }
        }
    }, [counter])

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }      

    const sortDriversByLapStartTimes = () => {
        setDrivers(drivers => drivers.sort((a, b) => {
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
            <div>
                <h1>This is the second screen page.</h1>
                {waiting ? <Waiting /> : <></>}
                {showTelemetry ? <TelemetryTable drivers={drivers} telemetry={telemetry} counter={counter} lap={lap} isLoading={isLoading} error={error}/> : <></>}
                {twitter ? <TwitterFeed /> : <></>}
                {reddit ? <RedditFeed after="1567948401425" before="1567952844599"/> : <></>}
            </div>
        )
    }
}

export default SecondScreen;