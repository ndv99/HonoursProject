import { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function F1LoginModal (props) {
    const [token, setToken] = useState("")

    const { toggle, onSave } = props;

    const handleSubmit = (e) => {
        onSave(token)
        e.preventDefault();
    }

    return(
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Enter your F1TV Pro Entitlement Token</ModalHeader>
            <ModalBody>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <FormGroup>
                        <Label for="login-token">Entitlement Token</Label>
                        <Input 
                            type="text"
                            id="login-token"
                            name="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Entitlement token"
                        />
                    </FormGroup>
                    <Button type="submit" color="danger">Log in</Button>
                    {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
                </Form>
            </ModalBody>
            <ModalFooter>Your login details will not be stored.</ModalFooter>
        </Modal>
    )
}

export default F1LoginModal;