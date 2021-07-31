import React, { Component } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import APIURL from '../../../helpers/environment';
import { Link } from "react-router-dom";
import AddHabit from "./AddHabit";


type acceptedProps = {
    sessionToken: any | null;
    habitId: number | null;
    updateHabitId: (newHabitId: number) => void;
};

type acceptedState = {
    newHabit: string;
    description: string;
    goal: string;
};

export default class EditHabit extends Component<acceptedProps, acceptedState> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            newHabit: "",
            description: "",
            goal: "",
        };
    }

    componentDidMount() {
        this.fetchHabit();
    }

    fetchHabit = () => {
        if (this.props.sessionToken) {
            console.log("Fetching Habit: ", this.props.habitId);
            fetch(`${APIURL}/habit/one/${this.props.habitId}`, {
                method: "GET",
                headers: new Headers({
                    Authorization: this.props.sessionToken,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ newHabit: data.newHabit });
                    this.setState({ description: data.description });
                    this.setState({ goal: data.goal });
                    console.log(this.state.goal);
                })
                .catch((err) => console.log(err));
        }
    };

    handleUpdate = (e: any) => {
        console.log("Update Habit Goal");
        e.preventDefault();
        if (this.props.sessionToken) {
            console.log(this.props.habitId);
            fetch(`${APIURL}/habit/update/${this.props.habitId}`, {
                method: "PUT",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
                    accept: "application/json",
                }),
                body: JSON.stringify({
                    habits: {
                        goal: this.state.goal,
                    },
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    <AddHabit
                        sessionToken={this.props.sessionToken}
                        updateHabitId={this.props.updateHabitId}
                        habitId={this.props.habitId}
                    />;
                });
        }
    };


    render() {
        return (
            <div className='main'>
                <div className='habit-container'>
                    {console.log("HabitId: ", this.props.habitId)}
                    <h1 className='page-title'>Update Habit Goal</h1>
                    <div>
                        <form
                            style={{ backgroundColor: '#79E4EF' }}
                            onSubmit={this.handleUpdate}
                        >
                            <TextField
                                value={this.state.newHabit}
                                variant="filled"
                                id="newHabit"
                                label="Habit"
                            />
                            <br />
                            <br />
                            <TextField
                                value={this.state.description}
                                variant="filled"
                                id="description"
                                label="Description"
                            />
                            <br />
                            <br />
                            <TextField
                                value={this.state.goal}
                                onChange={(e) => this.setState({ goal: e.target.value })}
                                id="goal"
                                label="Update Habit Goal"
                                multiline
                                rowsMax={2}
                            />
                            <br />
                            <br />
                            <ButtonGroup
                                style={{
                                    marginLeft: "0%",
                                }}
                                variant="contained"
                                color="primary"
                                aria-label="contained primary button group"
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    onClick={(e) =>
                                        alert(
                                            "Habit Goal has been updated. Press Habits to go back to your Habits list."
                                        )
                                    }
                                >
                                    Save Goal Update
                                </Button>
                                <Link to="/habit/entry">
                                    <Button variant="contained" type="submit">
                                        Habits
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
