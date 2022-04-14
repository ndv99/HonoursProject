import {Row, Col} from 'reactstrap'

const DriverRow = (driver, telemetry_lap) => {
    driver = driver.driver

    return(
        <>
            <Col style={{textAlign: "right", width: "5px", flexGrow: 0, paddingRight: 0}}>
                <div className="driverColor" style={{backgroundColor: `#${driver.TeamColor}`}}/>
            </Col>
            <Col>{driver.Abbreviation}</Col>
            <Col>gap</Col>
            <Col>interval</Col>
            <Col>laptime</Col>
            <Col>tyre</Col>
        </>
    )
}

export default DriverRow;