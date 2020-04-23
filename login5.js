import React from 'react';
import Link from 'next/link.js';
import axios from 'axios';
import { Cookies } from 'react-cookie';

// set up cookies
const cookies = new Cookies();
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get('token') || null
    }
  }


async onLoginClick(event){    
    console.log("Login called");
    let mail = "user@dev.null";
    let pass = "1TrulySecurePassword!!";
    let a = "1";
    const response = await axios.get("http://localhost:8080/api/v1/login", {
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email: mail, password: pass }),
    });
  
    console.log(response.data)
    const token = response.data.token;
    cookies.set('token', token);
    this.setState({
      token: token
    })
  }

  render() {
    return (
      <div>
        <h2>Main page</h2>
        <br></br>
        <button onClick={() => this.onLoginClick()}>Get Token</button>
        <br></br>
        <p>Token: {this.state.token}</p>
        <br></br>
      </div >
    )
  }
}

export default Index;
