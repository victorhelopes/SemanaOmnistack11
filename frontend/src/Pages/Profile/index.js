import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import './styles.css';

export default function Profile()
{
    const [incidents, Setincidents]= useState([]);
    
    const history= useHistory();
    const ongId = localStorage.getItem('ongIdongId');
    const OngName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            Setincidents(response.data);
        })
    }, [ongId]) ;

    async function handleDeleteIncident(id)
    {
        try
        {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });

            Setincidents(incidents.filter(incident=>incident.id !==id));
        }
        catch(err)
        {
            alert('erro ao deletar, tente novamente')
        }
    }


    function handleLogout()
    {
        localStorage.clear();
        history.push('/');  
    }

    return(
        <div className = "profile-container">
            <header>
                <img src ={logoImg} alt = "Be the Hero"/>
                <span>Bem vinda, {OngName}</span>

                <Link className= "button" to = "/incidents/new">Cadastrar novo caso</Link>
                <button onClick = {handleLogout} type = "button">
                    <FiPower sizer = {18} color = "#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>  

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p> 

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format}</p>

                        <button onClick= {()=>handleDeleteIncident(incident.id)} type= "button">
                            <FiTrash2 size= {20} color = "a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}