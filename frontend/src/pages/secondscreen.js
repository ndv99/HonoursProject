import  { useState } from "react";
import TelemetryTable from '../components/telemetry-table';
import TwitterFeed from "../components/twitter-feed";
import RedditFeed from '../components/reddit-feed';

export const SecondScreen = () => {

    // this will later be changed to use props based on whatever the control device chooses to do
    const [reddit, setReddit] = useState(false)
    const [twitter, setTwitter] = useState(false)
    const [telemetry, setTelemetry] = useState(true)

    return(
        <div>
            <h1>This is the second screen page.</h1>
            <TelemetryTable />
            <TwitterFeed />
            <RedditFeed />
        </div>
    )
}

export default SecondScreen;