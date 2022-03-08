import './../styles/components/search.css'
import { Form, Button } from 'reactstrap'
import { Component } from 'react'
import axios from 'axios';

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

    handleSubmit(event) {
        this.refresh_list()

        

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
            <Form>
                  <Button color="success" type="submit">Generate code</Button>
            </Form>
        )
    }
}

export default CreateSessionForm;