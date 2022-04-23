import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "universal-cookie";

export const Broadcast = () => {

    const [url, setURL] = useState("https://ott-video-fer-cf.formula1.com/ondemand/93ff/_C_/3/2/wif0908043337/1/clip_2_master.m3u8?kid=1042&exp=1650828458&ttl=1440&token=yCraXwLFfl~Ur5bv0yPCJOi2kY2UeJbfzudf0-SN7wo_")
    const cookies = new Cookies()

    // useEffect(() => {
    //     getPlaybackURL()
    // }, [])

    const getPlaybackURL = () => {
        axios.get(
            "/api/f1video/", 
            {headers: {
                'ascendontoken': cookies.get('entitlementToken'),
                'contentid': '1000000731'
            }}
            // "https://f1tv.formula1.com/1.0/R/ENG/BIG_SCREEN_HLS/ALL/CONTENT/PLAY?contentId=1000000731",
            // {headers: {
            //     // 'ascendontoken': cookies.get('entitlementToken')
            //     'apikey': 'fCUCjWrKPu9ylJwRAv8BpGLEgiAuThx7',
            //     'ascendontoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFeHRlcm5hbEF1dGhvcml6YXRpb25zQ29udGV4dERhdGEiOiJVU0EiLCJTdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJTdWJzY3JpYmVySWQiOiIxNzk3MDUzMzQiLCJGaXJzdE5hbWUiOiJHb3Jkb24iLCJMYXN0TmFtZSI6IkZyZWVtYW4iLCJTZXNzaW9uSWQiOiJleUpoYkdjaU9pSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF4THpBMEwzaHRiR1J6YVdjdGJXOXlaU05vYldGakxYTm9ZVEkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaWRTSTZJakV3TURFeElpd2ljMmtpT2lJMk1HRTVZV1E0TkMxbE9UTmtMVFE0TUdZdE9EQmtOaTFoWmpNM05EazBaakpsTWpJaUxDSm9kSFJ3T2k4dmMyTm9aVzFoY3k1NGJXeHpiMkZ3TG05eVp5OTNjeTh5TURBMUx6QTFMMmxrWlc1MGFYUjVMMk5zWVdsdGN5OXVZVzFsYVdSbGJuUnBabWxsY2lJNklqRTNPVGN3TlRNek5DSXNJbWxrSWpvaU1HWmpORE5pWldRdE9HSmxNQzAwTVdGakxUbGpZekV0WlRBeU0yTXlNRFpsWkRCbUlpd2lkQ0k2SWpFaUxDSnNJam9pWlc0dFIwSWlMQ0prWXlJNklqTTJORFFpTENKaFpXUWlPaUl5TURJeUxUQTFMVEEzVkRFNU9qRTJPakUzTGpNME0xb2lMQ0prZENJNklqRWlMQ0psWkNJNklqSXdNakl0TURVdE1qTlVNVGs2TVRZNk1UY3VNelF6V2lJc0ltTmxaQ0k2SWpJd01qSXRNRFF0TWpSVU1UazZNVFk2TVRjdU16UXpXaUlzSW1sd0lqb2lNbUV3TWpwak4yVTZNVFV3TmpwaFpUQXdPbU13TWpBNlpXVTNaVHBrTjJGaU9qSTFaRFlpTENKamJ5STZJa2RDVWlJc0lteGhkQ0k2SWpVMElpd2liRzl1WnlJNklpMHlJaXdpYm1KbUlqb3hOalV3TnpReE16YzNMQ0psZUhBaU9qRTJOVE16TXpNek56Y3NJbWx6Y3lJNkltRnpZMlZ1Wkc5dUxuUjJJaXdpWVhWa0lqb2lZWE5qWlc1a2IyNHVkSFlpZlEuYTQ5OFYtTmFYeS11X0VMT3hSUUtudjBWZjJlUFRiM3FRVDhPNGN5T3JsQSIsIlN1YnNjcmliZWRQcm9kdWN0IjoiRjEgVFYgUHJvIE1vbnRobHkiLCJqdGkiOiJhYjg2NmU3OS02MWQ0LTQ5NmItOGQwZC05YTYxNTgwMDJlZTIiLCJTdWJzY3JpcHRpb24iOiJQUk8iLCJpYXQiOjE2NTA3NDIwNTcsImV4cCI6MTY1MTA4NzY1NywiaXNzIjoiRjEifQ.PpJkAWCagkeryUdNl02AoQX911DlRUxtFgycatIsXbs'
            // }}
        )
        .then((res) => setURL(res.data))
        .catch((err) => console.log(err))
    }

    return(
        <>
            <h1>Hi. You should install VLC media player.</h1>
            <p>Then open it, click "File / Open Network Stream" and paste the following URL:</p>
            <p>{url}</p>
        </>
    )
}

export default Broadcast;