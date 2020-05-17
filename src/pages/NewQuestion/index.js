import React, { useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { useId } from 'react-id-generator';

import './styles.css'

import logoImg from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function NewCourse() {
    const [descricao, setDescricao] = useState('');
    const [resposta, setResposta] = useState('');
    const [nivel, setNivel] = useState('FACIL');
    const [respostas, setRespostas] = useState([]);
    const history = useHistory();
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [id] = useId();

    const token = localStorage.getItem('token');

    function handleNewCourse(e) {
        e.preventDefault();

        console.log("id: "+id)
        const data = {
            id: Math.floor(Math.random() * 10),
            descricao,
            nivel: nivel,
            respostas
        };

        try {
            api.post('api/questoes', data, {
                headers: {
                    Authorization: localStorage.getItem('token')
                } 
            });

            history.push('/questionbank')

        } catch(err) {
            alert("Erro ao cadastrar questao, tente novamente")
        }
    }

    function handleAddAnswer() {
        respostas.push({
            id: 10,
            descricao: resposta,
            correta: false
        })
        setResposta('');
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };
    return (
        <div className="new-question-container">
            <div className="content">
                <header>
                 <h1>Cadastrar nova questão</h1>
                   <p>Cadastre sua pergunta, as respostas e defina a resposta correta. </p>
                </header>
              <div className="content-questions">
                <section>
                   <textarea 
                    placeholder="Pergunta"
                    value={descricao}
                    onChange={(e => setDescricao(e.target.value))}
                    />
                     <textarea 
                    placeholder="Resposta"
                    value={resposta}
                    onChange={(e => setResposta(e.target.value))}
                    />
                     <button className="button" onClick={handleAddAnswer}>Adicionar </button>
                   <Link className="back-link" to="/main">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Main
                 </Link>
                </section>

                <form  onSubmit={handleNewCourse}>
                <h1> {descricao}</h1>
                <List className={classes.root} style={{height: '500px'}}>
                    {respostas.map((resposta) => {
                        const labelId = `checkbox-list-label-${resposta}`;

                        return (
                        <ListItem key={resposta} role={undefined} dense button onClick={handleToggle(resposta)}>
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(resposta) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={resposta.descricao} />
                            
                        </ListItem>
                        );
                    })}
                </List>
                   
                        
                    <button className="button" type="submit">Cadastrar </button>
                </form>

                </div>
            </div>
        </div>
    )
}