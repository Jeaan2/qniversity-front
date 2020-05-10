import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css'

import api from '../../services/api'

import logoImg from '../assets/logo.svg';

export default function QuestionBank() {
    const history = useHistory();
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        // api.get('profile', {
        //     headers: {
        //         Authorization: ongId,
        //     }
        // }).then(response => {
        //     setIncidents(response.data);
        // })
    }, []);

   async function handleDeleteIncident(id) {
        // try { 
        //  await api.delete(`incidents/${id}`, {
        //      headers: {
        //          Authorization: ongId,
        //      }
        //  });

        //  setIncidents(incidents.filter( incident => incident.id !== id));
        // } catch {
        //     alert("Erro ao deletar caso, tente novamente.")
        // }
    }
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
            <li>
               <Link className="card-link" to="/course/"> 
                    <strong>Análise e Desenvolvimento de Sistemas  </strong>
                    <p> 6 períodos </p>
                </Link>
            </li>
                {/* <li >
                    <strong>Curso </strong>
                    <p>Engenharia da Computação </p>

                    <button onClick={() => {}}type="button">
                        <FiTrash2 size={20} color="a8a8b3"/>
                    </button>
                </li> */}
                {/* <li  onClick= { () => {console.log("CLICOU")}}>
                    <strong>Curso </strong>
                    <p>Aplicativos móveis e computação em Nuvem </p>

                    
                    <button onClick={() => {}}type="button">
                        <FiTrash2 size={20} color="a8a8b3"/>
                    </button>
                </li> */}

            </ul>
        </div>
    )
}

{/* {incidents.map(incident => (
                    <li key ={incident.id} >
                    <strong>CASO: </strong>
                    <p> {incident.title}</p>

                    <strong> DESCRIÇÃO: </strong>
                    <p>{incident.description}</p>

                    <strong> VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)}type="button">
                        <FiTrash2 size={20} color="a8a8b3"/>
                    </button>
                </li>
                ))} */}