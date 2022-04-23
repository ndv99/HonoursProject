import { Col, Row, Container, Card } from "reactstrap";
import DriverRow from './driver-row.js';
import './../styles/components/telemetry.css';

const TelemetryTable = (props) => {

    const {drivers, telemetry, lap, leadingDriver, raceFinished, setLap, sortDriversByCurrentSectorStartTimes, showTelemetry} = props;
    
    const track_status_data = {
        "1": "Green flag",
        "2": "Yellow flag",
        "3": "",
        "4": "Safety Car",
        "5": "Red Flag",
        "6": "Virtual Safety Car",
        "7": "Virtual Safety Car Ending"
    }

    const calculateInterval = (driver, i) => {
        try{
            return driver.CurrentLapStart - drivers[i-1].CurrentLapStart
        } catch(err) {
            return 0
        } 
    }
    
    return(
        <>
            {showTelemetry ? 
                <Card>
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
                            <DriverRow key={driver.DriverNumber} showTelemetry={showTelemetry} pos={i} driver={driver} telemetry={telemetry} lap={lap} gap={driver.CurrentLapStart - drivers[0].CurrentLapStart} interval={calculateInterval(driver, i)} leadingDriver={leadingDriver} raceFinished={raceFinished} setLap={setLap} sortDriversByCurrentSectorStartTimes={sortDriversByCurrentSectorStartTimes}/>                            
                        ))}
                    </Container>
                </Card>
            : 
                <Container>
                    {drivers.map((driver, i) => (
                            <DriverRow key={driver.DriverNumber} showTelemetry={showTelemetry} pos={i} driver={driver} telemetry={telemetry} lap={lap} gap={driver.CurrentLapStart - drivers[0].CurrentLapStart} interval={calculateInterval(driver, i)} leadingDriver={leadingDriver} raceFinished={raceFinished} setLap={setLap} sortDriversByCurrentSectorStartTimes={sortDriversByCurrentSectorStartTimes}/>                            
                    ))}
                </Container>
            }
        </>
    )
}

export default TelemetryTable;