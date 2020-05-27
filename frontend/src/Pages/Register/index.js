import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [WhatsApp, SetWhatsapp] = useState('');
    const [cidade, SetCidade] = useState('');
    const [UF, SetUF] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventdefault();
        
        const data ={
            name,
            email,
            WhatsApp,
            cidade,
            UF
        };
        try
        {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); 
        }
        catch(err)
        {
            alert('erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className = "register-container">
            <div className= "content">
                <section>
                    <img src = {logoImg} alt = 'Be The Hero'/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforme e ajuda pessoas a encontrarem os casos da sua ONG</p>

                    <Link className='back-link' to = "/">
                        <FiArrowLeft size = {16} color ="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit= {handleRegister}>
                    <input 
                        placeholder = "Nome da ONG"
                        value = {name}
                        onChange = {e => SetName(e.target.value)}
                    />
                    <input type = "email" placeholder = "E-mail"
                    value = {email}
                    onChange = {e => SetEmail(e.target.value)}
                    />
                    <input placeholder = "WhatsApp"
                        value = {WhatsApp}
                        onChange = {e => SetWhatsapp(e.target.value)}
                    />

                    <div className = "input-group">
                        <input placeholder = "cidade"
                            value = {cidade}
                            onChange = {e => SetCidade(e.target.value)}    
                        />
                        <input placeholder = "UF" style={{ width: 80 }}
                            value = {UF}
                            onChange = {e => SetUF(e.target.value)}    
                        />
                    </div>

                    <button className = "button" type= ":submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    );
}