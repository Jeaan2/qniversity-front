import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
 import qniversity from '../assets/qniversity1.png';
import logoImg from '../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

export default function Logon() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        history.push('/main')

        // try {
        //     const response = await api.post('auth', { email, senha });

        //     console.log("Resposta: "+response);
        //     history.push('/main')

        // } catch(err) {
        //     alert('Falha no Login, tente novamente.'+JSON.stringify(err))
        // }
    }
    return (
       <div className="logon-container">
           <section className="form">
           <h1> Bem-vindo a qNiversity, Professor! </h1>
           <h3>  Uma plataforma para tornar suas aulas muito mais interativas!</h3>
            <form onSubmit={handleLogin}>
                <h1> Faça seu Login </h1>
                <input 
                placeholder="Seu E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input 
                placeholder="Sua Senha"
                value={senha}
                type="password"
                onChange={e => setSenha(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro
                </Link>
            </form>
           </section>

           <img src={qniversity} alt="University" />
       </div>
    )
}