import React, {useState} from 'react'
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userID) => {
        setUsers(prevState => prevState.filter(user => user._id !== userID))
    }
    const renderPhrase = (number) => {
        if (users.length === 0) {
            return <h1>
                        <span className='badge bg-warning'>
                            Никто не тусанет с тобой сегодня
                        </span>
                    </h1>
        }

        const phraseFragment = number > 1 && number < 5 ? 'человека тусанут' : 'человек тусанет'
        return <h1>
            <span className='badge bg-primary'>
                {number} {phraseFragment} с тобой сегодня
            </span>
        </h1> 
    }
    const createClass = (color) => {
        return `badge m-2 bg-${color}`
    }
    const showUsers = () => {
        return users.map(user => (
            <tr key={user._id} >
                    <th scope="row">{ user.name }</th>
                    <td>
                        { user.qualities.map(q => (
                            <span className={createClass(q.color)} key={q._id}>{q.name}</span>
                        ))}
                    </td>
                    <td>{ user.profession.name }</td>
                    <td>{ user.completedMeetings }</td>
                    <td>{ user.rate }</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => {handleDelete(user._id)}}>Delete</button>
                    </td>
            </tr> ))
    }
    return (
        <>
            { renderPhrase(users.length) }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                    </tr>
                </thead>
                <tbody>
                    { showUsers() }
                </tbody>
            </table>
        </>
    )
}

export default Users