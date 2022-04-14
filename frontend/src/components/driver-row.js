import { Col } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'

function DriverRow (props) {

    const [driver, setDriver] = useState(props.driver)
    const [telemetry, setTelemetry] = useState(props.telemetry[parseInt(driver.DriverNumber)])
    const lap = props.lap
    

    // console.log(props.telemetry[parseInt(driver.DriverNumber)])

    // useEffect(() => {
        
    // }, [lap])

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
        var sec = time.getSeconds().toString()
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
            <Col>gap</Col>
            <Col>interval</Col>
            <Col>{convertMillisToSectorTime(telemetry.Sector1Time[Object.keys(telemetry.Sector1Time)[lap]])}</Col>
            <Col>{convertMillisToSectorTime(telemetry.Sector2Time[Object.keys(telemetry.Sector2Time)[lap]])}</Col>
            <Col>{convertMillisToSectorTime(telemetry.Sector3Time[Object.keys(telemetry.Sector3Time)[lap]])}</Col>
            <Col>{convertMillisToLaptime(telemetry.LapTime[Object.keys(telemetry.LapTime)[lap]])}</Col>
            <Col>{telemetry.Compound[Object.keys(telemetry.Compound)[lap]]}</Col>
        </>
    )
}

export default DriverRow;