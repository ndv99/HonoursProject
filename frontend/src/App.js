import './App.css';
import React, { Component } from "react";
import JoinSessionForm from './components/join-session-form'
import CreateSessionForm from './components/create-session-form';
// import useFetch from './hooks/useFetch';
import axios from "axios";
// import { Form, Button } from 'reactstrap';

// axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component{

  constructor(props){
    super(props);
    this.state  = {
      sessions_list: [],
    };
  }

  componentDidMount() {
    this.refresh_list();
  }

  refresh_list = () => {
    axios 
    .get("/api/sessions")
    .then((res) => {
      this.setState({ sessions_list: res.data })
      console.log(res.data)
    })
    .catch((err) => console.log(err)); 
  };

  renderItems(){
    // this.refresh_list();
    const newItems = this.state.sessions_list;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{item.join_code}</span>
        <span>{item.time_delay}</span>
      </li>
    ));
  }

  render(){

    return(
      <main>
        <h1 className="text-center my-4">Join a session</h1>
        <div className='row'>
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              {/* <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul> */}
              <JoinSessionForm />
              <a href='/broadcast/'>Video...</a>
            </div>
          </div>
        </div>

        <h1 className="text-center my-4">Create a new session</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <CreateSessionForm />
                {/* <ul className="list-group list-group-flush border-top-0">
                  {this.renderItems()}
                </ul> */}
              </div>
          </div>
        </div>
      </main>
    )
  }
  

}

export default App;
