import './../styles/components/search.css'
import { Form, Button } from 'reactstrap'
import { Component } from 'react'
import axios from 'axios';

class SessionForm extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            sessions_list: [],
            value: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.refresh_list();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // alert('A code was submitted: ' + this.state.value);

        this.refresh_list();
        console.log(this.state.sessions_list)

        let valid_code = this.state.sessions_list.find(obj => {
            return obj.join_code === this.state.value;
          })

        if (valid_code){
            alert("Woop woop, you've joined a session!")
        } else {
            alert("Uh oh, " + this.state.value + " is not a valid session code!")
        }

        event.preventDefault();
    }

    refresh_list = () => {
        axios 
        .get("/api/sessions")
        .then((res) => this.setState({ sessions_list: res.data }))
        .catch((err) => console.log(err)); 
    };

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <label htmlFor="session-search">
                    <span className="visually-hidden">Join a session</span>
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