import Clappr from "clappr";
import Cookies from 'universal-cookie';
import { Component } from "react";

class ClapprPlayer extends Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const { id, source } = this.props;

        this.player = new Clappr.Player({
            parentId: `#${id}`,
            source: source,
            plugins: [Clappr.FlasHLS],
            mimeType: 'application/x-mpegURL',
            withCredentials: true
        })
    }

    componentWillUnmount(){
        this.player.destroy();
        this.player = null;
    }

    render(){

        const id = this.props.id;
        const cookies = new Cookies();
        cookies.set('entitlement_token', 
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFeHRlcm5hbEF1dGhvcml6YXRpb25zQ29udGV4dERhdGEiOiJVU0EiLCJTdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJTdWJzY3JpYmVySWQiOiIxNzk3MDUzMzQiLCJGaXJzdE5hbWUiOiJHb3Jkb24iLCJMYXN0TmFtZSI6IkZyZWVtYW4iLCJTZXNzaW9uSWQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKemFTSTZJall3WVRsaFpEZzBMV1U1TTJRdE5EZ3daaTA0TUdRMkxXRm1NemMwT1RSbU1tVXlNaUlzSW1KMUlqb2lNVEF3TVRFaUxDSnBaQ0k2SWpZd05UbGpaakU1TFRaaE9EUXRORGcyT1MxaVpqSm1MV0ZtWVRReFlUSmpaakF6WWlJc0ltd2lPaUpsYmkxSFFpSXNJbVJqSWpvaU16WTBOQ0lzSW5RaU9pSXhJaXdpWVdWa0lqb2lNakF5TWkwd05DMHdOMVF4TkRveE56b3lPQzQyTkRsYUlpd2laV1FpT2lJeU1ESXlMVEEwTFRJelZERTBPakUzT2pJNExqWTBPVm9pTENKalpXUWlPaUl5TURJeUxUQXpMVEkxVkRFME9qRTNPakk0TGpZME9Wb2lMQ0p1WVcxbGFXUWlPaUl4TnprM01EVXpNelFpTENKa2RDSTZJalFpTENKcGNDSTZJakUwT1M0MU55NHhOaTR4TkRraUxDSmpieUk2SWxWVFFTSXNJbWx6Y3lJNkltRnpZMlZ1Wkc5dUxuUjJJaXdpWVhWa0lqb2lZWE5qWlc1a2IyNHVkSFlpTENKbGVIQWlPakUyTlRBM01qTTBORGdzSW01aVppSTZNVFkwT0RFek1UUTBPSDAuSTk0V3JXdE5PdlNCeFEydmxIVTFwRGpONzg4NnB1UUU3ejlBVHhBekRlYyIsIlN1YnNjcmliZWRQcm9kdWN0IjoiRjEgVFYgUHJvIE1vbnRobHkiLCJqdGkiOiIwZjBmOWM4ZC05MGY3LTRhZmEtOTdkMC0zZTY1ODRlM2VlMjQiLCJTdWJzY3JpcHRpb24iOiJQUk8iLCJpYXQiOjE2NDgxMzQxMzQsImV4cCI6MTY0ODQ3OTczNCwiaXNzIjoiRjEifQ.AKIc3PttHyiG_GQEqznaQ1q5bjw24D26n4FYl2Sl6SM',
                    { path: '/'});

        return(
            <p id={id} />
        )
    }
}

export default ClapprPlayer;