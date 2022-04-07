import { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class F1LoginModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            email: "",
            password: ""
        }
    }

    handleChange = (e) =>{
        let { name, value } = e.target;
        // console.log(`hey at least we're getting this far. field name is ${name} and the value is ${value}`)
        this.setState({[name]: value})
    }

    render(){
        const { toggle, onSave } = this.props;

        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Enter your F1TV Pro login details</ModalHeader>
                <ModalBody>
                    <Form onSubmit={() => onSave(this.state.email, this.state.password)}>
                        <FormGroup>
                            <Label for="login-email">Email</Label>
                            <Input 
                                type="email"
                                id="login-email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="Email address"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="login-password">Password</Label>
                            <Input 
                                type="password"
                                id="login-password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password"
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
}

export default F1LoginModal;