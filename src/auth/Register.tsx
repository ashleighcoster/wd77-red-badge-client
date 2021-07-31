import React, { Component } from "react";
import APIURL from "../helpers/environment";
import { Button, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

type acceptedProps = {
  updateToken: (newToken: string) => void;
  updateRole: (newUserRole: string) => void;
};

type UserState = {
  email: string;
  password: string;
  role: string;
};

export default class Register extends Component<acceptedProps, UserState> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: "",
    };
  }

  handleChangeRole = (e: any) => {
    this.setState({ role: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`${APIURL}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
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
      <div id="Register">
        <h2
          style={{
            textAlign: "center",
            marginTop: "15%",
            fontFamily: "Roboto",
          }}
        >
          Register Below
        </h2>
        <form
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "300px",
            display: "block",
          }}
          onSubmit={this.handleSubmit}>

          <TextField
            onChange={(e) => this.setState({ email: e.target.value })}
            id="email"
            label="email"
            inputProps={{
              pattern: ".+@.+.com",
            }}
            title="Must be in standard email format. Ex: youremail@email.com" />

          <TextField
            onChange={(e) => this.setState({ password: e.target.value })}
            id="password"
            type="password"
            label="password"
            inputProps={{
              pattern: "[a-zA-Z0-9]+",
              minLength: "5",
              maxLength: "15",
            }}
            title="Password must contain one number, one capital letter, and be 5-15 characters in length." />

          <br />

          <Select onChange={this.handleChangeRole}>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
          <Button
            variant="contained"
            type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

