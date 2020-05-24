import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
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
        <div className="question-bank-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                

                <Link className="button" to="/newquestion"> Cadastrar nova questão </Link>
                
                <button onClick={() => handleLogout()} type="button" >
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1> Questões </h1>
            <ul>
                {questoes.map(questao => (
                    <li key={questao.id}>
                    
                            <strong>{questao.descricao} </strong>
                            <List className={questoes.root} style={{height: '400px'}}>
                                    {questao.respostas.map((resposta) => {
                                    const labelId = `checkbox-list-label-${resposta}`;
                                    return (
                                        <ListItem key={resposta.id} role={undefined} dense button >
                                        <ListItemText id={labelId} primary={resposta.descricao} />
                                        </ListItem>
                                    );
                                    })}
                             </List>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}