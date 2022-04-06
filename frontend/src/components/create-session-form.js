import './../styles/components/search.css'
import { Button } from 'reactstrap'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios';
import F1LoginModal from './../components/f1-login-modal';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class CreateSessionForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sessions_list: [],
            value: '',
            modal: false,
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.navigate = useNavigate();
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    componentDidMount() {
        this.refresh_list();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(email, password) {
        // console.log("login form submitted")
        // console.log(`Recieved email ${email} and password ${password}`)

        // const f1_auth_link = 'https://api.formula1.com/v2/account/subscriber/authenticate/by-password'
        // const f1_auth_headers = {
        //     'apiKey': 'fCUCjWrKPu9ylJwRAv8BpGLEgiAuThx7',
        //     'User-Agent': 'RaceControl f1viewer'
        // }
        // const auth_body = {
        //     'Login': email,
        //     'Password': password
        // }

        // axios.post(f1_auth_link, auth_body, {headers: f1_auth_headers})
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err));

        axios.post("/api/f1auth/", {Login: email, Password: password})
        .then((res) => console.log(res))


        const new_session = {join_code: 0, time_delay: 0}

        axios
        .post("/api/sessions/", new_session)
        .then((res) => console.log(res));

        this.refresh_list()
        
        const cookies = new Cookies();
        cookies.set('session_code', this.state.sessions_list[this.state.sessions_list.length-1].join_code, {path:'/'})

        // this.toggle();
        // this.setState({redirect: true})
    }

    refresh_list = () => {
        axios 
        .get("/api/sessions")
        .then((res) => this.setState({ sessions_list: res.data }))
        .catch((err) => console.log(err)); 
    };

    render(){
        if (!this.state.redirect){
            return(
                <>
                    <Button color="success" onClick={this.toggle}>Generate code</Button>
                    {this.state.modal ? (
                        <F1LoginModal
                            toggle={this.toggle}
                            onSave={this.handleSubmit}
                        />
                    ): null}
                </>
            )
        } else {
            return(
                <Navigate replace to="/dashboard"/>
            )
        }
    }
}

export default CreateSessionForm;