import './../styles/components/search.css'
import { Form, Button } from 'reactstrap'
import { Component } from 'react'
import axios from 'axios';

// axios.defaults.xsrfHeaderName = "X-CSRFToken";

class CreateSessionForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
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

    handleSubmit() {
        this.refresh_list()

        const new_session = {join_code: 0, time_delay: 0}

        axios
        .post("/api/sessions/", new_session)
        .then((res) => this.refreshList());

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
                <Button color="success" type="submit">Generate code</Button>
            </Form>
            
        )
    }
}

export default CreateSessionForm;