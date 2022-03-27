// import { Component } from "react";
import { Row, Col, Container, Card, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';

const DeviceTable = () => {

        // for testing

    const device_list = [
        {device_name:"Device 1", mode:0}, 
        {device_name:"Device 2", mode:1}, 
        {device_name:"Device 3", mode:2}
    ]
    
    return(
        <Card>
            <Container>
                {device_list.map((device, i) => (
                    <Row key={i}>
                        <Col>{device.device_name}</Col>
                        {/* <Col>{device.mode}</Col> */}
                        <Col>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Mode {device.mode}
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            Mode 0
                                        </DropdownItem>
                                        <DropdownItem>
                                            Mode 1
                                        </DropdownItem>
                                        <DropdownItem>
                                            Mode 2
                                        </DropdownItem>
                                    </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                        <Button color="danger">Remove</Button>
                    </Row>
                ))}
            </Container>
        </Card>
    )
}

export default DeviceTable;