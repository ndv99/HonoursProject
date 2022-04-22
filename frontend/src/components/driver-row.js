import { Col } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'

function DriverRow (props) {

    const [counter, setCounter] = useState(0)
    const [l1s1complete, setl1s1complete] = useState(false)

    const driver = props.driver
    const telemetry = props.telemetry[parseInt(driver.DriverNumber)]
    const lap = props.lap
    const setLap = props.setLap
    const gap = props.gap
    const interval = props.interval
    const leadingDriver = props.leadingDriver
    const raceFinished = props.raceFinished

    useEffect(() => {
        // console.log(`Updating telemetry for driver ${driver.DriverNumber}`)
        console.log(`State of raceFinished: ${raceFinished}`)
        if (!raceFinished) {

            let timeoutLength;
            if (driver.CurrentSector === 1) {
                timeoutLength = telemetry.Sector1Time[driver.CurrentLap]
            } else if (driver.CurrentSector === 2) {
                timeoutLength = telemetry.Sector2Time[driver.CurrentLap]
            } else { 
                timeoutLength = telemetry.Sector3Time[driver.CurrentLap]
            }
            const timer = setTimeout(() => setCounter(counter + 1), timeoutLength)

            if (driver.CurrentSector === 1 && lap === 1) {
                setl1s1complete(true)
            }

            if (driver.CurrentSector != 3) { 
                driver.CurrentSector += 1} 
            else { 
                driver.CurrentSector = 1
                driver.CurrentLap = incrementDriverCurrentLap(driver.CurrentLap)
                if (driver.DriverNumber === leadingDriver.DriverNumber) {
                    setLap(lap + 1)
                }
            }            
            
            if (driver.CurrentSector === 1) {
                driver.CurrentSectorStart = telemetry.Sector1SessionTime[driver.CurrentLap]
            } else if (driver.CurrentSector === 2) {
                driver.CurrentSectorStart = telemetry.Sector2SessionTime[driver.CurrentLap]
            } else {
                driver.CurrentSectorStart = telemetry.Sector3SessionTime[driver.CurrentLap]
            }
            return () => clearTimeout(timer)

        }
    }, [counter])

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function incrementDriverCurrentLap(lapnumber){
        // console.log("Old lapnumber: " + lapnumber)
        lapnumber = parseInt(lapnumber)
        // console.log("lapnumber as int: " + lapnumber)
        lapnumber += 1
        // console.log("incremented lapnumber as int: " + lapnumber)
        lapnumber = lapnumber.toString()
        // console.log("incremented lapnumber as string: " + lapnumber)
        return lapnumber
    }

    const convertMillisToLaptime = (millis) => {
        var time = new Date(millis)
        var min = time.getMinutes().toString()
        var sec = time.getSeconds().toString()
        var mil = ("00" + time.getMilliseconds().toString()).slice(-3)

        return min + ":" + sec + "." + mil
    }

    const convertMillisToSectorTime = (millis) => {
        var time = new Date(millis)
        var min = time.getMinutes()
        var sec = ("0" + time.getSeconds().toString()).slice(-2)
        var mil = ("00" + time.getMilliseconds().toString()).slice(-3)

        if (min > 0){
            return min + ":" + sec + "." + mil
        } else {
            return sec + "." + mil
        }
    }

    return(
        <>
            <Col style={{textAlign: "right", width: "5px", flexGrow: 0, paddingRight: 0}}>
                <div className="driverColor" style={{backgroundColor: `#${driver.TeamColor}`}}/>
            </Col>
            <Col style={{color: driver.CurrentSectorStart == null ? "red" : "black"}}>{driver.Abbreviation}</Col>
            <Col>{driver.CurrentSectorStart != null ? convertMillisToSectorTime(gap) : ""}</Col>
            <Col>{driver.CurrentSectorStart != null ? convertMillisToSectorTime(interval) : ""}</Col>
            <Col>{driver.CurrentSectorStart != null && l1s1complete ? convertMillisToSectorTime(telemetry.Sector1Time[driver.CurrentLap]) : ""}</Col>
            <Col>{driver.CurrentSector != 2 && driver.CurrentSectorStart != null ? convertMillisToSectorTime(telemetry.Sector2Time[driver.CurrentLap]) : ""}</Col>
            <Col>{driver.CurrentSector === 1 && driver.CurrentSectorStart != null ? convertMillisToSectorTime(telemetry.Sector3Time[driver.CurrentLap]) : ""}</Col>
            <Col style={{color: telemetry.IsPersonalBest[driver.CurrentLap] ? "lime" : (driver.CurrentSectorStart == null ? "red" : "black")}}>{driver.CurrentSectorStart != null ? convertMillisToLaptime(telemetry.LapTime[driver.CurrentLap]) : "STOP"}</Col>
            <Col style={{color: telemetry.Compound[driver.CurrentLap] === "SOFT" ? "red" : telemetry.Compound[driver.CurrentLap] === "MEDIUM" ?  "yellow" : "black"}}>{telemetry.Compound[driver.CurrentLap]}</Col>
        </>
    )
}

export default DriverRow;