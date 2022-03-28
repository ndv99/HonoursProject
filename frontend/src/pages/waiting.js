import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Waiting = () => {
    return(
        <>
            <h1>Screen ready. Assign it something from your control device.</h1>
            <p>Session ID: {cookies.get("session_code")}</p>
        </>
    )
}

export default Waiting;