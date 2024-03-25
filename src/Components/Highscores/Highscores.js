import { sendUserAttributeVerificationCode } from 'aws-amplify/auth';
import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../../App.js'
import './Highscores.css';

const crownTypes = ['goldCrown', 'silverCrown', 'bronzeCrown'];

const Highscores = () => {

    const [users, setUsers] = useState([]);
    const {userData} = useContext(UserContext);

    useEffect( () => {
        fetch('https://6x4u2qgurl.execute-api.us-east-1.amazonaws.com/test/users')
        .then(response => response.json())
        .then(jsonResponse => {
            jsonResponse.users.sort((a, b) => b.winnings - a.winnings);
            setUsers(jsonResponse.users);
        })
    }, [userData])

    return (
        <div className='highscores'>
            <h2 className='highscores-title'>Highscores</h2>
            <div className='highscores-scores'>
            {users.length > 0 ? users.map((user, idx) => {
                return (
                <div className='highscores-scorecard' key={idx}>
                    <span className='position-circle'><p className='highscores-position'>{idx + 1}</p></span>
                    {idx < 3 ? <img src={process.env.PUBLIC_URL + "/crown.png"} alt='crown' className={crownTypes[idx]}></img> : <div></div>}
                    <p className='highscores-username'>{user.username}</p>
                    {idx < 3 ? <img src={process.env.PUBLIC_URL + "/crown.png"} alt='crown' className={crownTypes[idx]}></img> : <div></div>}
                    <p className='highscores-cash'>${user.winnings}</p>
                </div>
                )
            })
            :
            <p>No users to show</p>
            }
            </div>
        </div>
    )
}

export default Highscores