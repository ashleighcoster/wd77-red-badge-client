import React, { Component } from 'react'
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import APIURL from '../../../helpers/environment';

type acceptedProps = {
    sessionToken: any | null
    habitId: number | null
}

type acceptedState = {
    journalEntry: string;
    habitId: number | null;
};

export default class EditJournal extends Component<acceptedProps, acceptedState> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            journalEntry: "",
            habitId: 0,
        };
    }

    componentDidMount() {
        this.fetchJournals();
    }
    fetchJournals = () => {
        if (this.props.sessionToken) {
            console.log(this.props.habitId);
            fetch(`${APIURL}/habits/one/${this.props.habitId}`, {
                method: "GET",
                headers: new Headers({
                    Authorization: this.props.sessionToken,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ journalEntry: data.journalEntry });
                    console.log(this.state.journalEntry);
                })
                .catch((err) => console.log(err));
        }
    };

    handleUpdateJournal = (e: any) => {
        console.log("handleUpdateJournal function called");
        if (this.props.sessionToken) {
            console.log(this.props.habitId);
            fetch(`${APIURL}/journal/update/${this.props.habitId}`, {
                method: "PUT",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
                    accept: "application/json",
                }),
                body: JSON.stringify({
                    journals: {
                        journalEntry: this.state.journalEntry,
                    },
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                });
        }
    };

    render() {
        return (
            <div className='main'>

                {console.log(this.props.habitId)}
                <h1 className='page-title'>Update Journal Entry</h1>
                <div>
                    <form
                        style={{ backgroundColor: '#79E4EF' }}
                        onSubmit={this.handleUpdateJournal}>

                        <TextField
                            onChange={(e) => this.setState({ journalEntry: e.target.value })}
                            id="journalEntry"
                            label="Update Journal" />

                        <br />

                        <Button variant="contained" type="submit">
                            Add
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}