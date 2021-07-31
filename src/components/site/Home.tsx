import React, { FC } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {

    return (
        <div className='main'>
            <h1 className='page-title'>rou·tine</h1>
            <h3>: a regular course of procedure</h3>

            <hr />
            <br />
            <h4 className='tealText'>
                "Habits are the “compound interest” of self-improvement" - James Clear
            </h4>
            <p className='tealText'>People are creatures of habit, and routines offer a way to promote health and wellness through structure and organization.</p>
            <p>After an unpredictable year, rou·tine can help you realign, recenter, and refocus.</p>
            <br />
            <hr />
            <br />
            <div className='home-div'>
                <h2 >Start tracking your habits today!</h2>
                <Button variant="outlined">
                    <Link to="/user/register">
                        Register or Login
                    </Link>
                </Button>
                <br />

                <img id='home-picture' src="https://images.pexels.com/photos/1558691/pexels-photo-1558691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className='card' height='400px' alt='habit-tracker'></img>
            </div>
        </div>
    );
};

export default Home;