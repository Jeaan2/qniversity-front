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
        api.get('api/cursos', {
            headers: {
                Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YWxpY2VuLnJAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNVQVJJTyIsImNyZWF0ZWQiOjE1ODkxMzk2NzQ1NDIsImV4cCI6MTU4OTc0NDQ3NH0.wuqAShH1-pNZnjnufAvtFm6BxQsmRzBqY0w_3m_gIus00RO2eagjQNz3M4dG1brTBrkzyYtgricUCYwPBhSX8Q"
            } //TODO mudar depois que criar a session
        }).then(response => {
            console.log("response: "+JSON.stringify(response.data))
            setCursos(response.data);
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
            {/* {cursos.map(curso => (
                    <li>
                    <Link className="card-link" to="/course/"> 
                            <strong>curso.nome </strong>
                            <p>curso.qtdPeriodos </p>
                    </Link>
                    </li>
                    
                ))} */}
            </ul>
        </div>
    )
}

