import { Col, Row, Container } from "reactstrap";
import DriverRow from './driver-row.js';
import './../styles/components/telemetry.css';

const TelemetryTable = (props) => {

    // const [drivers, setDrivers] = useState(props.drivers)
    // const [telemetry, setTelemetry] = useState(props.telemetry)
    // const [lap, setLap] = useState(props.lap)

    const {drivers, telemetry, lap} = props;
    
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
                <Row key={driver.DriverNumber}>
                    <Col>{i + 1}</Col>
                    <DriverRow driver={driver} telemetry={telemetry} lap={lap} gap={driver.CurrentLapStart - drivers[0].CurrentLapStart} interval={calculateInterval(driver, i)}/>
                </Row>
                
            ))}
        </Container>
    )
}

export default TelemetryTable;