import { Col } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'

function DriverRow (props) {

    const [driver, setDriver] = useState(props.driver)
    const [telemetry, setTelemetry] = useState(props.telemetry[parseInt(driver.DriverNumber)])
    const lap = props.lap
    const gap = props.gap
    const interval = props.interval

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
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
            <Col>{driver.Abbreviation}</Col>
            <Col>{convertMillisToSectorTime(gap)}</Col>
            <Col>{convertMillisToSectorTime(interval)}</Col>
            <Col>{convertMillisToSectorTime(telemetry.Sector1Time[Object.keys(telemetry.Sector1Time)[lap]])}</Col>
            <Col>{convertMillisToSectorTime(telemetry.Sector2Time[Object.keys(telemetry.Sector2Time)[lap]])}</Col>
            <Col>{convertMillisToSectorTime(telemetry.Sector3Time[Object.keys(telemetry.Sector3Time)[lap]])}</Col>
            <Col style={{color: telemetry.IsPersonalBest[getKeyByValue(telemetry.LapNumber, lap)] ? "lime" : "black"}}>{convertMillisToLaptime(telemetry.LapTime[Object.keys(telemetry.LapTime)[lap]])}</Col>
            <Col style={{color: telemetry.Compound[Object.keys(telemetry.Compound)[lap]] === "SOFT" ? "red" : telemetry.Compound[Object.keys(telemetry.Compound)[lap]] === "MEDIUM" ?  "yellow" : "black"}}>{telemetry.Compound[Object.keys(telemetry.Compound)[lap]]}</Col>
        </>
    )
}

export default DriverRow;