import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css'

import api from '../../services/api'

import logoImg from '../assets/logo.svg';

export default function Main() {
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
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span> Bem vindo, professor! {} </span>

                <Link className="button" to="/newcourse"> Cadastrar novo curso </Link>
                
                <button onClick={() => handleLogout()} type="button" >
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1> Cursos </h1>
            <ul>
            {cursos.map(curso => (
                    <li key={curso.id}>
                    <Link className="card-link" to="/course/"> 
                            <strong>{curso.nome} </strong>
                            <p>{curso.qtdPeriodos} períodos</p>
                    </Link>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}

