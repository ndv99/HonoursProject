import './../styles/components/search.css'
import { Form, Button } from 'reactstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';

function JoinSessionForm () {

    const [sessions_list, setSessionsList] = useState([])
    const [value, setValue] = useState("")

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
            const cookies = new Cookies();
            cookies.set('session_code', value, {path: '/'})

            // this.state.redirect = true;
            // setRedirect(true)
            navigate_to_secondscreen()
        } else {
            alert("Uh oh, " + value + " is not a valid session code!")
        }
    }

    const navigate_to_secondscreen = () => {
        navigate('/secondscreen/', {replace: true})
    }

    const refresh_list = () => {
        axios 
        .get("/api/sessions")
        .then((res) => setSessionsList(res.data))
        .catch((err) => console.log(err)); 
    };

    return(
        <Form onSubmit={handleSubmit}>
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