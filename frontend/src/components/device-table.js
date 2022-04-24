// import { Component } from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Card, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import Cookies from 'universal-cookie';

const DeviceTable = () => {

    // for testing

    // const device_list = [
    //     {device_name:"Device 1", mode:0}, 
    //     {device_name:"Device 2", mode:1}, 
    //     {device_name:"Device 3", mode:2}
    // ]

    const [device_list, setDeviceList] = useState([])
    const [counter, setCounter] = useState(0)
    const cookies = new Cookies()

    useEffect(() => {
        const timer = setTimeout(() => setCounter(counter + 1), 2000)

        refresh_list()

        return () => clearTimeout(timer)
    }, [counter])

    const refresh_list = () => {
        axios.get(`/api/sessions/${cookies.get('session_id')}/`)
        .then((res) => setDeviceList(res.data.devices))
        .catch((err) => console.log(err))
    }
    
    const set_device_mode = (mode, i) => {
        console.log(`Setting device ${device_list[i].id} to mode ${mode}`)
        let temp_devices = device_list
        temp_devices[i].mode = mode
        console.log(temp_devices)
        setDeviceList(temp_devices)
        axios.patch(`/api/sessions/${cookies.get('session_id')}/`, {devices: temp_devices})
        .then((res) => setDeviceList(res.data.devices))
        .catch((err) => console.log(err))
    }
    
    return(
        <Card>
            <Container>
                {device_list.map((device, i) => (
                    <Row key={device.id}>
                        <Col>Device {device.id}</Col>
                        {/* <Col>{device.mode}</Col> */}
                        <Col>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Mode {device.mode}
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => set_device_mode(1, i)}>
                                            Mode 1
                                        </DropdownItem>
                                        <DropdownItem onClick={() => set_device_mode(2, i)}>
                                            Mode 2
                                        </DropdownItem>
                                        <DropdownItem onClick={() => set_device_mode(3, i)}>
                                            Mode 3
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