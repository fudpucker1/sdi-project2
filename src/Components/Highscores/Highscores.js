import { sendUserAttributeVerificationCode } from 'aws-amplify/auth';
import React, { useEffect, useState } from 'react'
import './Highscores.css'

const Highscores = () => {

    const [users, setUsers] = useState([]);

    useEffect( () => {
        fetch('https://6x4u2qgurl.execute-api.us-east-1.amazonaws.com/test/users')
        .then(response => response.json())
        .then(jsonResponse => {
            jsonResponse.users.sort((a, b) => b.winnings - a.winnings);
            setUsers(jsonResponse.users);
        })
    }, [])

    return (
        <div className='highscores'>
            <h2 className='highscores-title'>Highscores</h2>
            <div className='highscores-scores'>
            {users.length > 0 ? users.map((user, idx) => {
                return (
                <div className='highscores-scorecard' key={idx}>
                    <p>{user.username}</p>
                    <p>${user.winnings}</p>
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