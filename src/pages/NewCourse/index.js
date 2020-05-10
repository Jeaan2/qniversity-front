import React, { useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css'

import logoImg from '../assets/logo.svg';

export default function NewCourse() {
    const [nome, setNome] = useState('');
    const [qtdPeriodos, setQtdPeriodos] = useState('');
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    function handleNewCourse(e) {
        e.preventDefault();

        const data = {
            nome,
            qtdPeriodos
        };

        try {
            api.post('api/cursos', data, {
                headers: {
                    Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YWxpY2VuLnJAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNVQVJJTyIsImNyZWF0ZWQiOjE1ODkxMzk2NzQ1NDIsImV4cCI6MTU4OTc0NDQ3NH0.wuqAShH1-pNZnjnufAvtFm6BxQsmRzBqY0w_3m_gIus00RO2eagjQNz3M4dG1brTBrkzyYtgricUCYwPBhSX8Q"
                } //TODO Mudar para  token da session 
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
                   {/* <img src={logoImg} alt="Be The Hero"/> */}
                   <h1>Cadastrar novo curso</h1>
                   <p>Descreva as informações do curso. Nele você adicionará turmas e turnos após concluir o cadastro. </p>

                   <Link className="back-link" to="/main">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Main
                 </Link>
                </section>

                <form  onSubmit={handleNewCourse}>
                    <input 
                    placeholder="Nome do curso"
                    value={nome}
                    onChange={(e => setNome(e.target.value))}
                    />
                    
                    <input 
                    placeholder="Número de períodos"
                    value={qtdPeriodos}
                    onChange={(e => setQtdPeriodos(e.target.value))}
                    />
                        
                    <button className="button" type="submit">Cadastrar </button>
                </form>
            </div>
        </div>
    )
}