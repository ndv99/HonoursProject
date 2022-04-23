import  { useState, useEffect } from "react";
import TelemetryTable from '../components/telemetry-table';
import TwitterFeed from "../components/twitter-feed";
import RedditFeed from '../components/reddit-feed';
import { Waiting } from '../components/waiting.js';
import axios from "axios";
import LoadingSpinner from '../components/loading-spinner'

export const SecondScreen = () => {

    // this will later be changed to use props based on whatever the control device chooses to do
    const [reddit, setReddit] = useState(true)
    const [twitter, setTwitter] = useState(false)
    const [showTelemetry, setShowTelemetry] = useState(true)
    const [waiting, setWaiting] = useState(false)

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

                console.log(driverlist[driver])
            }

            setBefore(driverlist[0].CurrentLapStartDate)
            setAfter(Object.values(repairedTelemetry[parseInt(driverlist[0].DriverNumber)].LapStartTime)[1])
            
            setDrivers(driverlist)
            setTelemetry(telemetry => (repairedTelemetry))
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setError(err)
            setLoading(false)
        })
    }, [])

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
            <div>
                <h1>This is the second screen page.</h1>
                <h2>Lap {lap}/{totalLaps}</h2>
                {waiting ? <Waiting /> : <></>}
                <TelemetryTable showTelemetry={showTelemetry} drivers={drivers} telemetry={telemetry} lap={lap} isLoading={isLoading} error={error} leadingDriver={leadingDriver} raceFinished={raceFinished} setLap={setLap} sortDriversByCurrentSectorStartTimes={sortDriversByCurrentSectorStartTimes}/>
                {twitter ? <TwitterFeed /> : <></>}
                {reddit ? <RedditFeed after={after} before={before}/> : <></>}
            </div>
        )
    }
}

export default SecondScreen;