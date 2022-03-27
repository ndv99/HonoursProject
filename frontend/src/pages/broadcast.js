import React from "react";
import ClapprPlayer from "../components/clappr-player.js";

export const Broadcast = () => {
    return(
        <>
            <h1>This is the broadcast page.</h1>
            <ClapprPlayer id="f1broadcast" source="https://ott-video-cf.formula1.com/f7b399c8cf81ac81/out/v1/0b7a94ad4ee84b168178c6d09d38cc9c/index.m3u8?kid=1042&exp=1648483567&ttl=1440&token=bONTcXJY0huabkJCHWpbHoJjiqwngH3q0J3NOxUlqms_&start=2022-03-27T16:00:04+00:00"/>
        </>
    )
}

export default Broadcast;