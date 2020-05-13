import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css'

import api from '../../services/api'

import logoImg from '../assets/logo.svg';

export default function QuestionBank() {
    const history = useHistory();
    const [questoes, setQuestoes] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        api.get('api/questoes', {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setQuestoes(response.data.data);
        })
    }, []);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                

                <Link className="button" to="/newcourse"> Cadastrar nova questão </Link>
                
                <button onClick={() => handleLogout()} type="button" >
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1> Questões </h1>
            <ul>
                {questoes.map(questao => (
                    <li key={questao.id}>
                    <Link className="card-link" to="/course/"> 
                            <strong>{questao.descricao} </strong>
                            <p>Nivel: {questao.nivel}</p>
                            {/* <p>{questao.respostas[]} questões</p> */}
                    </Link>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}