import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            console.log(response.data.name);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name)
            alert('Login realizado com sucesso!');
            history.push('profile');
        } catch(err){
            alert(`Erro ao realizar login!\n Info: ${err}`)
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id} 
                        onChange={event => setId(event.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
