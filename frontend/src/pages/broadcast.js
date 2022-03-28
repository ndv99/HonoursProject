import React from "react";

export const Broadcast = () => {
    const link = `https://ott-video-cf.formula1.com/f7b399c8cf81ac81/out/v1/0b7a94ad4ee84b168178c6d09d38cc9c/index.m3u8?kid=1042&exp=1648483567&ttl=1440&token=bONTcXJY0huabkJCHWpbHoJjiqwngH3q0J3NOxUlqms_&start=2022-03-27T16:00:04+00:00`
    return(
        <>
            <h1>Hi. You should install VLC media player.</h1>
            <p>and then open <a href={link}>this</a> with it</p>
        </>
    )
}

export default Broadcast;