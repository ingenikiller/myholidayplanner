
import { apiClient } from "../core/ApiClient";
import { useState } from "react";
import {useNavigate} from "react-router";

import './../css/login.css';

export const LoginForm = () => {

    const [nom, setNom] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        const response = await apiClient.post('api.php?domaine=technique&service=gettoken&nom='+nom+'&motDePasse='+motDePasse);
        if(response.data.racine.status=='KO') {
            setError(response.data.racine.message);
        } else {
            localStorage.setItem('token', response.data.racine.valeur);
            navigate('/planner');
        }
        return;
    }


    return (
    <div id="login">
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <br/>
                            <form id="login-form" className="form"  onSubmit={handleSubmit}>
                                <h3 className="text-center">Login</h3>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label><br/>
                                    <input className="form-control" type="text" name="nom" id="nom" onChange={(e) => setNom(e.target.value)} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label><br/>
                                    <input className="form-control" id="motDePasse" name="motDePasse" type="password" onChange={(e) => setMotDePasse(e.target.value)} required/>
                                </div>
                                <br/>
                                <div className="row justify-content-md-center">
                                    <div className="col-md-auto">
                                        <button type="submit" className="btn btn-primary">Se connecter</button>
                                    </div>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )



}


