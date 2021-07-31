import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from "../helpers/environment";

type acceptedProps = {
  updateToken: any;
};

type userState = {
  email: string;
  password: string;
};

export default class Login extends Component<acceptedProps, userState> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        console.log(data);
      });
  };

  render() {
    return (
      <div id="Login">
        <h2>Login Below</h2>
        <form
          className="form"
          style={{
            alignContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            width: "30%",
          }}
          onSubmit={this.handleSubmit}
        >
          <TextField
            label="email"
            id="email"
            onChange={(e: any) => this.setState({ email: e.target.value })}
            type="text" />

          <TextField
            label="password"
            id="password"
            onChange={(e: any) => this.setState({ password: e.target.value })}
            type="password" />

          <Button variant="contained" type="submit" className="form__custom-button">
            Log in
          </Button>
        </form>
      </div>
    );
  }
}






// import React, { useState } from "react";
// import { Form, FormGroup, Input, Button, Row, Col, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
// import { useHistory } from "react-router-dom";
// import APIURL from '../../../helpers/environment';

// const Login = (props) => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const history = useHistory();

//     const handleSubmit = (event) => {
//         event.preventDefault(event);
//         fetch(`${APIURL}/user/login`, {
//             method: 'POST',
//             body: JSON.stringify({ email: email, password: password }),
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             })
//         }).then(
//             (response) => response.json()
//         ).then((data) => {
//             props.updateToken(data.token);
//             history.push("/profile");
//         }).catch((err) => {
//             console.log(err);
//             alert("Valid Email and Password must be provided")
//         })
//     }



//     return (
//         <div className="main">
//             <div className="login-container d-flex justify-content-center">

//                 <Row>
//                     <Col>

//                         <h1 className='page-title'>Login</h1>
//                         <Form onSubmit={handleSubmit}>
//                             <FormGroup>
//                                 <InputGroup>
//                                     <InputGroupAddon addonType="prepend">
//                                         <InputGroupText >Email:</InputGroupText>
//                                     </InputGroupAddon>
//                                     <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
//                                 </InputGroup>
//                             </FormGroup>
//                             <br />
//                             <FormGroup>
//                                 <InputGroup>
//                                     <InputGroupAddon addonType="prepend">
//                                         <InputGroupText>Password:</InputGroupText>
//                                     </InputGroupAddon>
//                                     <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password"/>
//                                 </InputGroup>
//                             </FormGroup>
//                             <br />
//                             <Button type="submit" color="primary" >Login</Button>
//                         </Form>

//                     </Col>
//                 </Row>

//             </div>
//         </div>
//     )
// };

// export default Login;

// onChange={(e) => setPassword(e.target.value)} name="password" value={password}