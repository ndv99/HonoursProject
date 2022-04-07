import { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function F1LoginModal (props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { toggle, onSave } = props;

    return(
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Enter your F1TV Pro login details</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="login-email">Email</Label>
                        <Input 
                            type="email"
                            id="login-email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="login-password">Password</Label>
                        <Input 
                            type="password"
                            id="login-password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </FormGroup>
                    <Button color="danger" onClick={() => onSave(email, password)}>Log in</Button>
                    {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
                </Form>
            </ModalBody>
            <ModalFooter>Your login details will not be stored.</ModalFooter>
        </Modal>
    )
}

export default F1LoginModal;