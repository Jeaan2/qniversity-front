import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css'

import api from '../../services/api'

import logoImg from '../assets/logo.svg';

export default function QuizPage() {
    const history = useHistory();
    const [cursos, setCursos] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('token');
        api.get('api/cursos', {
            headers: {
                Authorization: localStorage.getItem('token')
            } //TODO mudar depois que criar a session
        }).then(response => {
            console.log("response: "+JSON.stringify(response.data))
            setCursos(response.data.data);
        })
    }, []);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
           

            <h1> Quiz </h1>
            {/* <h1> Perguntas:  </h1>
            <ul>
            {cursos.map(curso => (
                    <li key={curso.id}>
                    <Link className="card-link" to="/course/" > 
                            <strong>{curso.nome} </strong>
                            <p>{curso.qtdPeriodos} períodos</p>
                    </Link>
                    </li>
                    
                ))}
            </ul> */}
        </div>
    )
}

