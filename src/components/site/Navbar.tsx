import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, Toolbar } from "@material-ui/core";
import Home from "./Home";
import Profile from "../functions/profile/Profile";
import AddHabit from "../functions/habits/AddHabit";
import EditHabit from "../functions/habits/EditHabit";
import AddJournal from "../functions/journal/AddJournal";
import EditJournal from "../functions/journal/EditJournal";
import logo from './routineLogo.png';

type acceptedProps = {
    sessionToken: string | null;
    clickLogout: () => void;
    habitId: number | null;
    journalId: number | null;
    updateHabitId: (newHabitId: number) => void;
    updateJournalId: (newJournalId: number) => void;
};

export default class Navbar extends Component<acceptedProps, {}> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {};
        console.log(props);
    }

    render() {

        return (
            <div className="barOfNavigation">

                <Toolbar>
                    <img src={logo} alt='logo' style={{ width: 75, height: 65 }} id='nav-logo' />
                    <Button >
                        <Link to="/">Home</Link>
                    </Button>

                    <Button >
                        <Link to="/habit/entry">Add Habit</Link>
                    </Button>

                    <Button >
                        <Link to="/journal/entry">Add Journal</Link>
                    </Button>

                    <Button >
                        <Link to="/profile">Profile</Link>
                    </Button>

                    <Button
                        onClick={this.props.clickLogout}>
                        <Link to="/">Logout</Link>
                    </Button>
                    {console.log("Nav Footer")}
                </Toolbar>

                <Switch>
                    <Route exact path="/"><Home /></Route>

                    <Route exact path="/habit/entry">
                        <AddHabit
                            sessionToken={this.props.sessionToken}
                            updateHabitId={this.props.updateHabitId}
                            habitId={this.props.habitId} />
                    </Route>

                    <Route exact path="/EditHabit">
                        <EditHabit
                            sessionToken={this.props.sessionToken}
                            updateHabitId={this.props.updateHabitId}
                            habitId={this.props.habitId} />
                    </Route>

                    <Route exact path="/journal/entry">
                        <AddJournal
                            sessionToken={this.props.sessionToken}
                            habitId={this.props.habitId}
                            journalId={this.props.journalId}
                            updateJournalId={this.props.updateJournalId} />
                    </Route>

                    <Route exact path="/EditJournal">
                        <EditJournal
                            sessionToken={this.props.sessionToken}
                            habitId={this.props.habitId} />
                    </Route>

                    <Route exact path="/profile">
                        <Profile
                            sessionToken={this.props.sessionToken}
                            habitId={this.props.habitId}
                            journalId={this.props.journalId}
                            updateJournalId={this.props.updateJournalId}
                            updateHabitId={this.props.updateHabitId} />
                    </Route>
                </Switch>
            </div>
        );
    }
}

