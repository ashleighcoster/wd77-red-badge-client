import React, { Component } from "react";
import APIURL from '../../../helpers/environment';
import { Button, ButtonGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@material-ui/core";

type acceptedProps = {
    sessionToken: any | null;
    habitId: number | null;
    journalId: number | null;
    updateJournalId: (newJournalId: number) => void;
};

type acceptedState = {
    journalEntry: string;
    journalId: number | null;
    journal: any[];
};

export default class AddJournal extends Component<acceptedProps, acceptedState> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            journalEntry: "",
            journalId: 0,
            journal: [],
        };
    }

    componentDidMount() {
        this.fetchJournals();
    }

    fetchJournals = () => {
        if (this.props.sessionToken) {
            console.log(this.props.habitId);
            fetch(`${APIURL}/journal/all/${this.props.habitId}`, {
                method: "GET",
                headers: new Headers({
                    Authorization: this.props.sessionToken,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ journal: data });
                    console.log(data);
                })
                .catch((err) => console.log(err));
        }
    };

    addJournal = (e: any) => {
        e.preventDefault();
        fetch(`${APIURL}/journal/add/${this.props.habitId}`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.sessionToken,
                accept: "application/json",
            }),
            body: JSON.stringify({
                journalEntry: this.state.journalEntry,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.fetchJournals();
            });
    };

    handleDelete = (id: number | null) => {
        console.log("handleDelete function called");
        if (this.props.sessionToken) {
            console.log(
                "Habit: ",
                this.props.habitId,
                "Journal Entry: ",
                this.props.journalId
            );

            fetch(`${APIURL}/journal/delete/${this.state.journalId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken,
                    "Accept": "application/json",
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.fetchJournals();
                });
        }
    };

    journalMapper = () => {
        return this.state.journal.map((data, index) => {
            return (
                <TableRow key={index}>
                    <TableCell align="right">{data.journalEntry}</TableCell>
                    <TableCell align="right">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={(e) => {
                                this.setState({ journalId: data.id });
                                this.handleDelete(this.state.journalId);
                            }}
                        >
                            Delete
                        </Button>
                        <Link to="/EditJournal">
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                startIcon={<UpdateIcon />}
                                onClick={(e) => {
                                    this.setState({ journalId: data.id });
                                    this.props.updateJournalId(data.id);
                                }}
                            >
                                Update
                            </Button>
                        </Link>
                    </TableCell>
                </TableRow>
            );
        });
    };
    render() {
        return (
            <div className='main'>
                <div className='journal-container'>
                    <h2
                        className='page-title' >Track Progress for Your Habits through Journal Entries</h2>
                    <Box>
                        <form
                            style={{ backgroundColor: '#79E4EF' }}
                            onSubmit={this.addJournal}>

                            <TextField
                                onChange={(e) => this.setState({ journalEntry: e.target.value })}
                                id="journalEntry"
                                label="Journal Entry" />
                            <br />
                            <br />
                            <ButtonGroup
                                variant="contained"
                                color="primary"
                                aria-label="contained primary button group">

                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit">
                                    Add Entry
                                </Button>

                                <Link to="/journal/entry">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.fetchJournals}>
                                        Get Journals
                                    </Button>
                                </Link>

                                <Link to="/profile">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.fetchJournals}>
                                        Return to Habits
                                    </Button>
                                </Link>

                            </ButtonGroup>
                        </form>
                    </Box>
                </div>
                <div>
                    <h2 className='page-title'>
                        Journal Entries:
                    </h2>
                    <TableContainer
                        component={Paper}
                        style={{ backgroundColor: '#79E4EF' }}>

                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Track, Delete, and Update Your Journal Entries:</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.journalMapper()}</TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}
