import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css'

import api from '../../services/api'

import logoImg from '../assets/logo.svg';

export default function Quizzes() {
    const history = useHistory();
    const [quizzes, setQuizzes] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
       api.get('api/quizzes', { 
           headers: {
               Authorization: token
           }
       }).then(response => {
           setQuizzes(response.data.data);
       })
    }, []);

   async function handleDeleteIncident(id) {
    }
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                

                <Link className="button" to="/newquiz"> Cadastrar novo quiz </Link>
                
                <button onClick={() => handleLogout()} type="button" >
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1> Quizzes </h1>
            <ul>
            {quizzes.map(quiz => (
                    <li key={quiz.id}>
                    <Link className="card-link" to="/course/"> 
                            <strong>{quiz.nome} </strong>
                            <p>{quiz.descricao} períodos</p>
                            { quiz.ativo ? <p>Ativo</p> : ''}
                    </Link>
                    </li>
                    
                ))}
                
            </ul>
        </div>
    )
}
