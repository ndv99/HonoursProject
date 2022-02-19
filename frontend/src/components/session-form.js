import './../styles/components/search.css'
import { Form, Button } from 'reactstrap'
import { Component } from 'react'

class SessionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A code was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <label htmlFor="session-search">
                    <span className="visually-hidden">Search blog posts</span>
                </label>
                <input
                    type="text"
                    id="session-search"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Enter your session code here"
                />
                <Button variant="primary" type="submit">Join</Button>
            </Form>
        )
    }
}

export default SessionForm;