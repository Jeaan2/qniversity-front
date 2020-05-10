import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import newId from '../../utils/generateId';
import _ from 'lodash';

import './styles.css'
import logoImg from '../assets/logo.svg';
import uniqueId from 'lodash/uniqueId';
export default function Register() {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();


    async function handleRegister(e) {
        e.preventDefault();
        
        setId(parseInt(_.uniqueId('40')));

        const data = { 
            id,
            nome, 
            sobrenome,
            email,
            cpf,
            senha
        }

        console.log(data);

        try {
            const response = await api.post('api/professor', data)
            console.log("Response: "+JSON.stringify(response))

            history.push('/');
        } catch {
            alert('Erro no cadastro, tente novamente!')
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                   <img src={logoImg} alt="Be The Hero"/>
                   <h1>Cadastro</h1>
                   <p>Faça seu cadastro, entre na plataforma e distribua conhecimento aos seus alunos! </p>

                   <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Login
                 </Link>
                </section>

                <form  onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome "
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder="Sobrenome "
                        value={sobrenome}
                        onChange={e => setSobrenome(e.target.value)}
                    />
                     <input 
                    placeholder="CPF"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)} />

                    <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                    <input 
                    type="password" 
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)} />
                    
                    <button className="button" type="submit">Cadastrar </button>
                </form>
            </div>
        </div>
    )
}