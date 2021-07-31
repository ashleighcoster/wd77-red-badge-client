import React, { Component } from 'react';
import APIURL from '../../../helpers/environment';
import { TextField, Button, ButtonGroup } from '@material-ui/core';
import { Link } from "react-router-dom";


type acceptedProps = {
    sessionToken: string | null;
    habitId: number | null;
    updateHabitId: (newHabitId: number) => void;
};
type acceptedState = {
    newHabit: string;
    description: string;
    goal: string;
    habitId: number;
    habits: any[];
};

export default class AddHabit extends Component<acceptedProps, acceptedState> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            newHabit: '',
            description: '',
            goal: '',
            habitId: 0,
            habits: [],
        };
        console.log(props);
    }

    componentDidMount() {
        this.fetchAllHabits();
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(this.props.sessionToken);

        if (this.props.sessionToken) {

            fetch(`${APIURL}/habit/entry`, {
                method: 'POST',
                headers: new Headers({
                    "Authorization": this.props.sessionToken,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }),
                body: JSON.stringify({
                    // habits: {
                    newHabit: this.state.newHabit,
                    description: this.state.description,
                    goal: this.state.goal,
                    // },
                }),

            })
                .then((res) => res.json())
                .then((data) => {
                    this.fetchHabits(e);
                    console.log(data);
                })
                .catch((err) => err);
        }
    };

    fetchHabits = (e: any) => {
        e.preventDefault();
        console.log(this.props.sessionToken);

        if (this.props.sessionToken) {
            fetch(`${APIURL}/habit/profile`, {
                method: "GET",
                headers: new Headers({
                    "Authorization": this.props.sessionToken,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({ habits: data });
                });
        };
    };

    fetchAllHabits = () => {
        console.log("fetchAllHabits");
        console.log(this.props.sessionToken);
        fetch(`${APIURL}/habit/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ habits: data });
            });
    };

    render() {

        return (
            <div className='main'>
                <div className='habit-container'>
                    <h1 className='page-title'>Start Your Routine</h1>

                    <form
                        onSubmit={this.handleSubmit}
                        style={{ backgroundColor: '#79E4EF' }}>

                        <br />
                        <TextField
                            onChange={(e) => this.setState({ newHabit: e.target.value })}
                            id="newHabit"
                            label="Add Habit"
                        />
                        <br />
                        <br />
                        <TextField
                            onChange={(e) => this.setState({ description: e.target.value })}
                            id="description"
                            label="Description"
                            multiline
                            rowsMax={2}
                        />
                        <br />
                        <br />
                        <TextField
                            onChange={(e) => this.setState({ goal: e.target.value })}
                            id="goal"
                            label="Goal"
                        />
                        <br />
                        <br />
                        <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="contained primary button group">

                            <Button variant="contained" type="submit">
                                Add
                            </Button>

                            <Link to="/profile">
                                <Button
                                    variant="contained"
                                    color='primary'
                                    onClick={this.fetchAllHabits}>
                                    Get All Habits
                                </Button>
                            </Link>

                        </ButtonGroup>
                    </form>

                </div>
            </div >
        );
    };
}


