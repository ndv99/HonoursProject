import { useEffect, useState } from "react";
import axios from 'axios';

export const Broadcast = () => {

    const [url, setURL] = useState("")

    useEffect(() => {
        getPlaybackURL()
    }, [])

    const getPlaybackURL = () => {
        axios.get(
            "/api/f1video/", 
            {headers: {
                'ascendontoken': 'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJFeHRlcm5hbEF1dGhvcml6YXRpb25zQ29udGV4dERhdGEiOiJVU0EiLCJTdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJTdWJzY3JpYmVySWQiOiIxNzk3MDUzMzQiLCJGaXJzdE5hbWUiOiJHb3Jkb24iLCJMYXN0TmFtZSI6IkZyZWVtYW4iLCJleHAiOjE2NTAwNjA3NTMsIlNlc3Npb25JZCI6ImV5SmhiR2NpT2lKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXhMekEwTDNodGJHUnphV2N0Ylc5eVpTTm9iV0ZqTFhOb1lUSTFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUppZFNJNklqRXdNREV4SWl3aWMya2lPaUkyTUdFNVlXUTROQzFsT1ROa0xUUTRNR1l0T0RCa05pMWhaak0zTkRrMFpqSmxNaklpTENKb2RIUndPaTh2YzJOb1pXMWhjeTU0Yld4emIyRndMbTl5Wnk5M2N5OHlNREExTHpBMUwybGtaVzUwYVhSNUwyTnNZV2x0Y3k5dVlXMWxhV1JsYm5ScFptbGxjaUk2SWpFM09UY3dOVE16TkNJc0ltbGtJam9pTkdVNU1EUmlNREV0TXpCa05TMDBaRGt4TFdJd09EUXRNRFZrWldZd04yWTJPVFU1SWl3aWRDSTZJakVpTENKc0lqb2laVzR0UjBJaUxDSmtZeUk2SWpNMk5EUWlMQ0poWldRaU9pSXlNREl5TFRBMExUSTFWREl5T2pFeU9qTXpMakkzT1ZvaUxDSmtkQ0k2SWpFaUxDSmxaQ0k2SWpJd01qSXRNRFV0TVRGVU1qSTZNVEk2TXpNdU1qYzVXaUlzSW1ObFpDSTZJakl3TWpJdE1EUXRNVEpVTWpJNk1USTZNek11TWpjNVdpSXNJbWx3SWpvaU1tRXdNanBqTjJVNk1UVXdOanBoWlRBd09tUTRabVU2TldRMU16bzFZV00xT2poaE16UWlMQ0pqYnlJNklrZENVaUlzSW14aGRDSTZJalUwSWl3aWJHOXVaeUk2SWkweUlpd2libUptSWpveE5qUTVOekUxTVRVekxDSmxlSEFpT2pFMk5USXpNRGN4TlRNc0ltbHpjeUk2SW1GelkyVnVaRzl1TG5SMklpd2lZWFZrSWpvaVlYTmpaVzVrYjI0dWRIWWlmUS5meFBMeVhHcXE2QjJSSHhqVW16XzZoZko2MW45VVZONEZnX3BEWFcwQkRZIiwiaWF0IjoxNjQ5NzE1MTUzLCJTdWJzY3JpYmVkUHJvZHVjdCI6IkYxIFRWIFBybyBNb250aGx5IiwianRpIjoiYTg3ZDZiMWUtYjEyMy00MWYwLTlkNWItZDAxMTEwOWIyMTVkIn0.jkSY1-ZdZttFYU6yhXc3qTkQrZtLXvwX5shTRfSbbI_Aqx0FZRUStfA5Wc63x1IocrePig1PAi5ZkWWUMgsF1DPRNJIe4X6tbh9FFY3eOt88I-0xEJAFWJQiZ37MzuPer9qSD6uupiGmpu9Ra3ivv8B0nMgqkikFskQxE1LryF8nQLhk1NCCVqf66j3z2QLgOlb_nz2qZgb25isLpkmJHfuypkGhLdP_PjkLtaVJUpIkz71CS4Q-yGuLJ1dIa8X295tyoqT783LRH98d1Y2HEBYqiQykClL21RIyk_rb1zy3ue2iNVAmr4H1JeN4CQDhaoO9AEtIq49ZdvSg8bM5FA',
                'contentid': '1000005573'
            }
        })
        .then((res) => setURL(res.data))
        .catch((err) => console.log(err))
    }

    return(
        <>
            <h1>Hi. You should install VLC media player.</h1>
            <p>and then open <a href={url}>this</a> with it</p>
        </>
    )
}

export default Broadcast;