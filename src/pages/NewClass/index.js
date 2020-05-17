import React, { useState, useEffect} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Select from 'react-select';
import './styles.css'

import logoImg from '../assets/logo.svg';

export default function NewClass() {
    const [nome, setNome] = useState('');
    const [cursos, setCursos] = useState([]);
    const [curso, setCurso] = useState('');
    const [turnos, setTurnos] = useState([{ value: 1, label: "Matutino" }, { value: 2, label: "Vespertino"}, {value: 3, label: "Noturno"}])
    const [turno, setTurno] = useState('');
    const history = useHistory();
    const token = localStorage.getItem('token');

    useEffect(() => {

        api.get('api/cursos', {
            headers: {
                Authorization: localStorage.getItem('token')
            } //TODO mudar depois que criar a session
        }).then(response => {
            console.log("response: "+JSON.stringify(response.data))
            setCursos(response.data.data);
        })
    }, [])

    let selectCursos = cursos.map(function (curso) {
        return {value: curso.id, label: curso.nome}
    })

    function handleNewClass(e) {
        e.preventDefault();

        const data = {
            nome,
            id: 123,
            cursoId: curso,
            turnoId: turno
        };

        try {
            api.post('/api/turmas', data, {
                headers: {
                    Authorization: token
                }
            });

            // history.push('/')

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

                   <Link className="back-link" to="/classes">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para turmas
                 </Link>
                </section>

                <form  onSubmit={handleNewClass}>
                    <input
                    placeholder="Nome da Turma"
                    value={nome}
                    onChange={(e => setNome(e.target.value))}
                    />
                    <Select
                        placeholder={<div>Curso</div>}
                        className="basic-single"
                        name="form-field-name"
                        // value={curso}
                        options={selectCursos}
                        onChange={e => setCurso(e.value)}
                    />
                     <Select
                        placeholder={<div>Turno</div>}
                        className="basic-single"
                        name="form-field-name"
                        // value={curso}
                        options={turnos}
                        onChange={e => setTurno(e.value)}
                    />



                    <button className="button" type="submit">Cadastrar </button>
                </form>
            </div>
        </div>
    )
}