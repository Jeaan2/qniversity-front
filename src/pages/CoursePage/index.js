import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css'

import api from '../../services/api'

import logoImg from '../assets/logo.svg';

export default function CoursePage() {
    const history = useHistory();
    const [turmas, setTurmas] = useState([]);
    const token = localStorage.getItem('token');
    const [curso, setCurso] = useState('');

    useEffect(() => {
        // setCurso(this.props.location.curso)
        // console.log("curso:"+JSON.stringify(this.props.location.curso))
       api.get('api/turmas', { 
           headers: {
               Authorization: token
           }
       }).then(response => {
           setTurmas(response.data.data);
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
                

                {/* <Link className="button" to="/newclass"> Cadastrar nova turma </Link> */}
                
                <button onClick={() => handleLogout()} type="button" >
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1> Turmas </h1>
            <ul>
            {turmas.map(turma => (
                    <li key={turma.id}>
                    <Link className="card-link" to="/course/"> 
                            <strong>{turma.nome} </strong>
                            {/* <p>{curso.qtdPeriodos} períodos</p> */}
                    </Link>
                    </li>
                    
                ))}
                
            </ul>
        </div>
    )
}
