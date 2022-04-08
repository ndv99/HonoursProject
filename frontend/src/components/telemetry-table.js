import { Col, Row, Container } from "reactstrap";
import './../styles/components/telemetry.css'

const TelemetryTable = () => {

    const sample_drivers = [
        {
            Name: "LECLERC",
            Initials: "LEC",
            FullName: "C. LECLERC",
            FirstName: "Charles",
            LastName: "Leclerc",
            Color: "ed1c24",
            Team: "Ferrari",
            Num: "16"
        },
        {
            Name: "VERSTAPPEN",
            Initials: "VER",
            FullName: "M.VERSTAPPEN",
            FirstName: "Max",
            LastName: "Verstappen",
            Color: "1e5bc6",
            Team: "Red Bull Racing",
            Num: "1"
        },
        {
            Name: "RUSSELL",
            Initials: "RUS",
            FullName: "G.RUSSELL",
            FirstName: "George",
            LastName: "Russell",
            Color: "6cd3bf",
            Team: "Mercedes",
            Num: "63"
        },
    ]

    // eventually drivers will be pulled directly from fastf1, for now though we'll just use this sample table
    const drivers = sample_drivers


    return(
        <Container>
            <Row>
                <Col>POS</Col>
                <Col style={{width: "5px", flexGrow: 0}}/>
                <Col>NAME</Col>
                <Col>GAP</Col>
                <Col>INT</Col>
                <Col>LAP</Col>
                <Col>TYRE</Col>
            </Row>
            {drivers.map((driver, i) => (
                <Row key={i}>
                    <Col>{i + 1}</Col>
                    <Col style={{textAlign: "right", width: "5px", flexGrow: 0, paddingRight: 0}}>
                        <div className="driverColor" style={{backgroundColor: `#${driver.Color}`}}/>
                    </Col>
                    <Col>{driver.Initials}</Col>
                    <Col>gap</Col>
                    <Col>interval</Col>
                    <Col>laptime</Col>
                    <Col>tyre</Col>
                </Row>
            ))}
        </Container>
    )
}

export default TelemetryTable;