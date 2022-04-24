import './../styles/components/search.css'
import { Form, Button } from 'reactstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';

function JoinSessionForm () {

    const [sessions_list, setSessionsList] = useState([])
    const [value, setValue] = useState("")

    const cookies = new Cookies();

    const navigate = useNavigate()

    useEffect(() => {
        refresh_list()
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = () => {
        // alert('A code was submitted: ' + this.state.value);

        refresh_list();
        console.log(sessions_list)

        let valid_code = sessions_list.find(obj => {
            return obj.join_code === value;
        })

        if (valid_code){
            
            cookies.set('session_code', value, {path: '/'})

            const session_id = valid_code.id
            cookies.set('session_id', session_id, {path: '/'})

            join_session(session_id)

            // this.state.redirect = true;
            // setRedirect(true)
        } else {
            alert("Uh oh, " + value + " is not a valid session code!")
        }
    }

    const join_session = (session_id) => {
        axios.patch(`/api/sessions/${session_id}/`, {devices: [{}]})
            .then((res) => {
                cookies.set('device_id', res.data.devices.at(-1).id)
                cookies.set('entitlementToen', res.data.ascendToken)
                navigate_to_secondscreen()
            })
            .catch((err) => console.log(err))
    }

    const navigate_to_secondscreen = () => {
        navigate('/secondscreen/', {replace: true})
    }

    const refresh_list = () => {
        axios 
        .get("/api/sessions/")
        .then((res) => setSessionsList(res.data))
        .catch((err) => console.log(err)); 
    };

    return(
        <Form onSubmit={handleSubmit} action='/secondscreen'>
            <label htmlFor="session-search">
                <span className="visually-hidden">Join a session</span>
            </label>
            <input
                type="text"
                id="session-search"
                value={value}
                onChange={handleChange}
                placeholder="Enter your session code here"
            />
            <Button color="primary" type="submit">Join</Button>
        </Form>
    )
}

export default JoinSessionForm;