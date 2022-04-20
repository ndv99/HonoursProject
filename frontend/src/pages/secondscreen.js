import  { useState } from "react";
import TelemetryTable from '../components/telemetry-table';
import TwitterFeed from "../components/twitter-feed";
import RedditFeed from '../components/reddit-feed';

export const SecondScreen = () => {

    // this will later be changed to use props based on whatever the control device chooses to do
    const [reddit, setReddit] = useState(true)
    const [twitter, setTwitter] = useState(false)
    const [telemetry, setTelemetry] = useState(false)

    return(
        <div>
            <h1>This is the second screen page.</h1>
            {telemetry ? <TelemetryTable /> : <></>}
            {twitter ? <TwitterFeed /> : <></>}
            {reddit ? <RedditFeed after="1567948401425" before="1567952844599"/> : <></>}
        </div>
    )
}

export default SecondScreen;