import React from "react";
import ClapprPlayer from "../components/clappr-player.js";

export const Broadcast = () => {
    return(
        <>
            <h1>This is the broadcast page.</h1>
            <ClapprPlayer id="f1broadcast" source="https://ott-video-fer-cf.formula1.com/c8059270529e63e492b34317933c3dca/out/v1/834af65834644680841d7d003e10db38/33957307c5b848a6bea693bb400a7166/e4d49ef8077f4032a097e2b0c8a962bb/index.m3u8?kid=1042&exp=1648481423&ttl=1440&token=YYjp5RDKcRcdmd2~XdfZpb5Gf31NFZOOCLmz1SdHuqQ_"/>
        </>
    )
}

export default Broadcast;