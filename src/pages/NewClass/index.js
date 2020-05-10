import React, { useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css'

import logoImg from '../assets/logo.svg';

export default function NewClass() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile')

        } catch(err) {
            alert("Erro ao cadastrar turma, tente novamente")
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                   
                   <h1>Cadastrar nova turma</h1>
                   {/* <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p> */}

                   <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                 </Link>
                </section>

                <form  onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Nome da Turma"
                    value={title}
                    onChange={(e => setTitle(e.target.value))}
                    />
                    <textarea 
                    placeholder="Descrição do caso"
                    value={description}
                    onChange={(e => setDescription(e.target.value))}
                    />
                    {/* TODO colocar um "spinner" para seleção do curso a ser vinculado*/}
                        
                    <button className="button" type="submit">Cadastrar </button>
                </form>
            </div>
        </div>
    )
}