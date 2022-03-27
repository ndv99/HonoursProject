import Clappr from "clappr";
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
            mimeType: 'application/x-mpegURL'
        })
    }

    componentWillUnmount(){
        this.player.destroy();
        this.player = null;
    }

    render(){

        const id = this.props.id;

        return(
            <p id={id} />
        )
    }
}

export default ClapprPlayer;