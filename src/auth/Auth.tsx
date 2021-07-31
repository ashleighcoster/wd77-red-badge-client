import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import Button from '@material-ui/core/Button';


type acceptedProps = {
  updateToken: (newToken: string) => void;
  updateRole: (newUserRole: string) => void;
};

type userState = {
  showLogin: boolean;
};

export default class Auth extends Component<acceptedProps, userState> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      showLogin: false,
    };
  }

  loginToggle = (event: any) => {
    event.preventDefault();
    if (this.state.showLogin === false) {
      return this.setState({
        showLogin: true,
      });
    }
    if (this.state.showLogin === true) {
      return this.setState({
        showLogin: false,
      });
    }
  };

  render() {
    return (

      <div className='main'>
        <div className='page-title'>
          <h2 className='page-title'>Register or login to start tracking your habits today!</h2>
        </div>

        <div id="container">
          {this.state.showLogin ? (
            <div>
              <Register
                updateToken={this.props.updateToken}
                updateRole={this.props.updateRole}
              />
            </div>

          ) : (

            <div>
              <Login
                updateToken={this.props.updateToken}
              />
            </div>
          )}
          <br />
          <Button
            variant="contained"
            onClick={(e) => {
              this.loginToggle(e);
            }}
          >
            {this.state.showLogin ? "Login" : "Sign up"}
          </Button>

          <img id='login-picture' src="https://millennial-grind.com/wp-content/uploads/2020/06/Quotes-from-Atomic-Habits-by-James-Clear-1.png" className='card' height='400px' alt='habit-tracker'></img>
        </div>
      </div>
    );
  }
}