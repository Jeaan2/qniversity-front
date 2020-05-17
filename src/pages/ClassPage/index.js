import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Select from 'react-select';
import './styles.css'

import logoImg from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ClassPage() {
    const [turma, setTurma] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const history = useHistory();
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        
        api.get('api/turmas/1', {
            headers: {
                Authorization: localStorage.getItem('token')
            } //TODO mudar depois que criar a session
        }).then(response => {
            console.log("response: "+JSON.stringify(response.data))
            setTurma(response.data.data);
            setAlunos(response.data.data.alunos);
            setQuizzes(response.data.data.quizzes);

        })
    }, [])
 
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

    function handleNewClass(e) {
        e.preventDefault();

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                   <h1>Alunos</h1>
                   <List className={classes.root} style={{height: '400px'}}>
                        {alunos.map((aluno) => {
                          const labelId = `checkbox-list-label-${aluno}`;
                          return (
                            <ListItem key={aluno.id} role={undefined} dense button onClick={handleToggle(aluno)}>
                              <ListItemText id={labelId} primary={aluno.nome} />
                            </ListItem>
                          );
                        })}
                      </List>
                   
                </section>
                <section>
                   <h1>Questionários</h1>
                   <List className={classes.root} style={{height: '400px'}}>
                        {quizzes.map((quiz) => {
                          const labelId = `checkbox-list-label-${quiz}`;

                          return (
                            <ListItem key={quiz} role={undefined} dense button onClick={handleToggle(quiz)}>
                              <ListItemText id={labelId} primary={quiz.nome} secondary={quiz.descricao} />
                            </ListItem>
                          );
                        })}
                      </List>
                </section>
            </div>
            
        </div>
    )
}