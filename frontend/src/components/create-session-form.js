import './../styles/components/search.css'
import { Button } from 'reactstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios';
import F1LoginModal from './../components/f1-login-modal';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function CreateSessionForm (){

    const [modal, setModal] = useState(false);
    const cookies = new Cookies();
    const navigate = useNavigate();

    const toggle = () => {
        setModal(!modal)
    };

    const handleSubmit = (email, password) => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";

        // axios.post("/api/f1auth/", {Login: email, Password: password})
        // .then((res) => cookies.set('entitlementToken', res.data.subscriptionToken))
        // .catch((err) => console.log(err))

        // cookies.set('entitlementToken', this.state.entitlementToken)

        // this.setState({entitlementToken: cookies.get("entitlementToken")})
        const new_session = {join_code: '', time_delay: 0, ascendToken: ''}

        axios
        .post("/api/sessions/", new_session)
        .then((res) => {
            cookies.set('session_code', res.data.join_code, {path:'/'})
            console.log("Session created successfully. Join code: " + res.data.join_code)
            navigate('/dashboard/', {replace: true})
        })
        .catch((err) => console.log(err));

        // let cookie_set = false;
        // while(!cookie_set){
        //     if(cookies.get('session_code') !== undefined){
        //         cookie_set = true;
        //     }
        // }
    }

    return(
        <>
            <Button color="success" onClick={toggle}>Generate code</Button>
            {modal ? (
                <F1LoginModal
                    toggle={toggle}
                    onSave={handleSubmit}
                />
            ): null}
        </>
    )
}

export default CreateSessionForm;