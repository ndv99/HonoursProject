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

    const handleSubmit = (token) => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";

        // axios.post("/api/f1auth/", {})
        // .then((res) => {
        cookies.set('entitlementToken', token)
        create_new_session(token);
        // })
        // .catch((err) => console.log(err))

        // cookies.set('entitlementToken', this.state.entitlementToken)

        // this.setState({entitlementToken: cookies.get("entitlementToken")})
    }

    const navigate_to_dashboard = () => {
        navigate('/dashboard/', {replace: true})
    }

    const create_new_session = (subscriptionToken) => {
        const new_session = {join_code: '', time_delay: 0, ascendToken: subscriptionToken}

        axios
        .post("/api/sessions/", new_session)
        .then((res) => {
            cookies.set('session_code', res.data.join_code, {path:'/'})
            console.log("Session created successfully. Join code: " + res.data.join_code)
            navigate_to_dashboard()
        })
        .catch((err) => console.log(err));
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