import { Col } from "react-bootstrap"
import { LoginForm } from "./loginForm"

import './../css/login.css';

export function Login() {

    return (<div>
        
        <div className="row login-page">
            <div className="login-zone">
            <Col sm="6" className="logo_login">
                <img src="logo_holiday.png" className="rounded" alt="..." width={500}/>
            </Col>
            <Col sm="6">
                <LoginForm/>    
            </Col>
            </div>
        </div>

        
    </div>
    )

}
