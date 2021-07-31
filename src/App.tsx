import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from './components/site/Navbar';
import Auth from "./auth/Auth";


type sessionState = {
  sessionToken: string | null;
  email: string | null;
  role: string,
  habitId: number | null;
  journalId: number | null,
};

export default class App extends Component<{}, sessionState> {
  constructor(props: sessionState) {
    super(props);
    this.state = {
      sessionToken: "",
      email: "",
      role: '',
      habitId: 0,
      journalId: 0
    };
  }

  componentDidMount() {
    if (localStorage.getItem("sessionToken")) {
      this.setState({ sessionToken: localStorage.getItem("sessionToken")! });
    }
    if (localStorage.getItem('role')) {
      this.setState({ role: localStorage.getItem('role')! })
      console.log(this.state.role);
    }
  }

  componentDidUpdate() {
    console.log("Updated");
    console.log(`User is admin: ${localStorage.getItem('role')}`);
  }


  updateHabitId = (newHabitId: number) => {
    this.setState({ habitId: newHabitId });
    console.log("habitId from App: ", newHabitId);
  };

  updateJournalId = (newJournalId: number) => {
    this.setState({ journalId: newJournalId });
    console.log("journalId from App: ", newJournalId);
  };

  updateToken = (newSessionToken: string) => {
    localStorage.setItem("sessionToken", newSessionToken);
    this.setState({ sessionToken: newSessionToken });
    console.log(newSessionToken);
  };

  updateRole = (newRole: string) => {
    this.setState({ role: newRole });
    console.log(newRole);
  };

  updateEmail = (newEmail: string) => {
    localStorage.setItem("email", newEmail);
    this.setState({ email: newEmail });
    console.log(newEmail);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "", role: "false" });
  };

  protectedViews = () => {
    console.log('role:', this.state.role);

    return this.state.sessionToken === localStorage.getItem("sessionToken") ? (
      // localStorage.getItem('role') === 'true' ? (

      <Router>
        <Navbar
          sessionToken={this.state.sessionToken}
          clickLogout={this.clearToken}
          habitId={this.state.habitId}
          journalId={this.state.journalId}
          updateHabitId={this.updateHabitId}
          updateJournalId={this.updateJournalId}
        />
      </Router>

    ) : (
      // <Route exact path='/home'>
      <Auth
        updateToken={this.updateToken}
        updateRole={this.updateRole}
      />
      // <Home />
      // </Route>
    )
  };

  // protectedViews = () => {
  //   return this.state.sessionToken === localStorage.getItem("sessionToken") ? (
  //     <Home sessionToken={this.state.sessionToken} />
  //   ) : (
  //     <Auth updateToken={this.updateToken} updateRole={this.updateRole} />
  //   )
  // }

  render() {

    return (
      <div className="App">
        <Router>
          <Navbar
            sessionToken={this.state.sessionToken}
            clickLogout={this.clearToken}
            habitId={this.state.habitId}
            journalId={this.state.journalId}
            updateHabitId={this.updateHabitId}
            updateJournalId={this.updateJournalId}
          />

          <Auth updateToken={this.updateToken} updateRole={this.updateRole} />

        </Router>
      </div>
    );

  }

};



