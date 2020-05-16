import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import './styles.css'

import logoImg from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      borderRadius: '8px',
      marginTop: '10px',
    //   maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function NewQuiz() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const history = useHistory();
    const classes = useStyles();
    const [questoes, setQuestoes] = useState([]);
    const [questoesIds, setQuestoesIds] = useState([]);
    const [ativo, setAtivo] = useState(true);
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

  const handleToggle = (value) => () => {
    const currentIndex = questoesIds.indexOf(value);
    const newChecked = [...questoesIds];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setQuestoesIds(newChecked);
  };

    function handleChecked() {
        if (ativo) {
            setAtivo(false)
        } else {
            setAtivo(true)
        }
    }


    function handleNewQuiz(e) {
        e.preventDefault();

        console.log("perguntas: "+JSON.stringify(questoesIds))


        const data = { 
            nome,
            descricao,
            ativo,
            questoesIds: questoesIds.map(function (questao) {
                return questao.id
            })
        }

        try {
            api.post('api/quizzes', data, {
                headers: {
                    Authorization: localStorage.getItem('token')
                } 
            });

            history.push('/quizzes')

        } catch(err) {
            alert("Erro ao cadastrar turma, tente novamente")
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                   {/* <img src={logoImg} alt="Be The Hero"/> */}
                   <h1>Cadastrar novo Quiz</h1>
                   <p>Dê um nome ao seu novo Quiz e vincule a ele as perguntas que desejar! </p>

                   <Link className="back-link" to="/quizzes">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Quizzes
                 </Link>
                </section>

                <form  onSubmit={handleNewQuiz}>
                    <input 
                    placeholder="Nome do Quiz"
                    value={nome}
                    onChange={(e => setNome(e.target.value))}
                    />
                    
                    <input 
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e => setDescricao(e.target.value))}
                    />
                    <div>
                     <Checkbox
                        edge="start"
                        checked={ativo}
                        onChange={handleChecked}
                        tabIndex={-1}
                        disableRipple
                        // inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <p>Ativo</p>
                    </div>
                    <p>Perguntas</p>
                    <List className={classes.root}>
                        {questoes.map((questao) => {
                            const labelId = `checkbox-list-label-${questao}`;

                            return (
                            <ListItem key={questao.id} role={undefined} dense button onClick={handleToggle(questao)}>
                                <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={questoesIds.indexOf(questao) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${questao.descricao}`} />
                                <ListItemSecondaryAction>
                                {/* <IconButton edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton> */}
                                </ListItemSecondaryAction>
                            </ListItem>
                            );
                                })}
                    </List>
                        
                    <button className="button" type="submit">Cadastrar </button>
                </form>
            </div>
            
        </div>
    )
}