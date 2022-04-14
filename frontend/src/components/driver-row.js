import { Col } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'

function DriverRow (props) {

    const [driver, setDriver] = useState(props.driver)
    const [telemetry, setTelemetry] = useState(props.telemetry[parseInt(driver.DriverNumber)])
    const [lap, setLap] = useState(1)
    const counter = useRef(0)

    // console.log(props.telemetry[parseInt(driver.DriverNumber)])

    useEffect(() => {
        if (counter.current < 40) {
            counter.current += 1;
            const timer = setTimeout(() => setLap(lap + 1), 1000)

            return () => clearTimeout(timer);
        }
    }, [lap])

    const convertMillisToLaptime = (millis) => {
        var time = new Date(millis)
        var min = time.getMinutes().toString()
        var sec = time.getSeconds().toString()
        var mil = ("00" + time.getMilliseconds().toString()).slice(-3)

        return min + ":" + sec + "." + mil
    }

    return(
        <>
            <Col style={{textAlign: "right", width: "5px", flexGrow: 0, paddingRight: 0}}>
                <div className="driverColor" style={{backgroundColor: `#${driver.TeamColor}`}}/>
            </Col>
            <Col>{driver.Abbreviation}</Col>
            <Col>gap</Col>
            <Col>interval</Col>
            <Col>{convertMillisToLaptime(telemetry.LapTime[Object.keys(telemetry.LapTime)[lap]])}</Col>
            <Col>{telemetry.Compound[Object.keys(telemetry.Compound)[lap]]}</Col>
        </>
    )
}

export default DriverRow;