
import { Navbar } from "react-bootstrap"
import { Link } from "react-router"

export function Menu() {

    return (
        <Navbar>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src="logo_holiday.png" width="150px"/>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" to="/planner">Planning</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/periodes">Périodes</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/joursferies">Jours fériés</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </Navbar>
    )

}

//export Menu
