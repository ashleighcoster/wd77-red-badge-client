import React, { Component } from 'react';
import APIURL from '../../../helpers/environment';
import { Button, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
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
  sessionToken: string | null;
  habitId: number | null;
  updateHabitId: (newHabitId: number) => void;
  journalId: number | null;
  updateJournalId: (newJournalId: number) => void;
};

type acceptedState = {
  newHabit: string;
  description: string;
  goal: string;
  habitId: number;
  habits: any[];
  journalEntry: string;
  journalId: number | null;
  journal: any[];
};

export default class Profile extends Component<acceptedProps, acceptedState> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      newHabit: '',
      description: '',
      goal: '',
      habitId: 0,
      habits: [],
      journalEntry: '',
      journalId: 0,
      journal: [],
    };
    console.log(props);

  }

  componentDidMount() {
    this.fetchJournals();
    this.fetchAllHabits();
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
          console.log(this.state.journalEntry);
        })
        .catch((err) => console.log(err));
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

  handleDelete = (habitId: number) => {
    if (this.props.sessionToken) {
      console.log(this.state.habitId);
      fetch(`${APIURL}/habit/delete/${this.state.habitId}`, {
        method: "DELETE",
        headers: new Headers({
          "Authorization": this.props.sessionToken,
          "Content-Type": "application/json",
          "Accept": "application/json",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.fetchAllHabits();
        });
    }
  };


  habitMapper = () => {
    return this.state.habits.map((data, index) => {
      return (
        <TableRow key={index}>
          <TableCell align="right">{data.newHabit}</TableCell>
          <TableCell align="right">{data.description}</TableCell>
          <TableCell align="right">{data.goal}</TableCell>
          <TableCell align="right">
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                  this.setState({ habitId: data.id });
                  this.handleDelete(this.state.habitId);
                }}
              >
                Delete
              </Button>
              <Link to="/EditHabit">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<UpdateIcon />}
                  onClick={(e) => {
                    this.setState({ habitId: data.id });
                    this.props.updateHabitId(data.id);
                  }}
                >
                  Update Habit
                </Button>
              </Link>
              <Link to="/journal/entry">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={(e) => {
                    this.setState({ habitId: data.id });
                    this.props.updateHabitId(data.id);
                  }}
                >
                  Add Journal Entry
                </Button>
              </Link>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      );
    });
  };


  render() {
    return (
      <div className='main'>
        <div className="profile-container">
          <h1 className='page-title'>View All Habits</h1>

          <div>

            <h2 className='page-title'>
              Delete, Update, or Add Journal Entries
            </h2>
            <TableContainer
              component={Paper}
              style={{ backgroundColor: '#79E4EF' }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Habit</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Goal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.habitMapper()}</TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
  };
}


