import { useEffect, useRef, useState } from "react";
import type { Periode } from "../interfaces/periodes";
import { apiClient } from "../core/ApiClient";
import Calendar from "./calendar";
import { Col } from "react-bootstrap";
import RadioGroup from "./radioGroup";
import { Menu } from "./menu";

export interface JourCongesFeries {
    date: string;
    type: string;

}

export const Planner = () => {

    const hasRun = useRef(false);
    
    const [ listePeriodes, setListePeriodes ] = useState<Periode[]>();
    const [ listeJoursCongesFeries, setListeJoursCongesFeries] = useState<JourCongesFeries[]>();

    var tabTypePeriode: [string, string][] = [
        ['inactif','inactif'],
        ['rtt','RTT'],
        ['conges','Congès'],
        ['cpa','Congès anticipés'],
        ['cps','Congès sans solde']
    ];

    useEffect(() => {
            if (hasRun.current) return;
            hasRun.current = true;
            apiClient.post("api.php?domaine=periode&service=getlisteactive").then((responsePeriode: any) => {
                let dateDeb = responsePeriode.data.racine.ListePeriodes.data[0].annee;
                let datefin = responsePeriode.data.racine.ListePeriodes.data[Number(responsePeriode.data.racine.ListePeriodes.totalLigne) -1].annee;
                apiClient.post("api.php?domaine=jour&service=getlisteglobale&anneeDebutPeriode="+dateDeb+"&anneeFinPeriode="+datefin).then((response: any) => {
                    setListeJoursCongesFeries(response.data.racine.ListeJours.data);
                    setListePeriodes(responsePeriode.data.racine.ListePeriodes.data);
                });
            });
        }, []);
    
    const typeSaisieRef = useRef<string>("inactif");

    const handleChange = (value: string) => {
        //console.log("handle: " +value)
        typeSaisieRef.current = value;
    };


    return(
    <>
        <Menu/>
        <p>Planner</p>
        <section className="row">
            <div className="col-8">	
                {listePeriodes && listeJoursCongesFeries &&
                    <Calendar listePeriodes={listePeriodes} listeJoursCongesFeries={listeJoursCongesFeries} typeSaisieRef={typeSaisieRef}/>
                }
            </div>
            
            <Col sm={4}>
                <center>
                
                <RadioGroup name="selctionTypeAbsence" listeOptions={tabTypePeriode} defaultValue="inactif" onChange={handleChange}/>
                <br/>
                <br/>
				<table className="calendrier">
                    <tbody>
					<tr>
						<th colSpan={2}>Legende</th>
					</tr>
					<tr>
						<td>RTT</td>
						<td className="rtt1"></td>
					</tr>
					<tr>
						<td>Congès</td>
						<td className="conges1">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td>
					</tr>
					<tr>
						<td>CP anticipés</td>
						<td className="cpa1">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td>
					</tr>
					<tr>
						<td>CP sans solde</td>
						<td className="cps1">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td>
					</tr>
                    </tbody>
				</table>
                <br/>
				<table id="tableauPeriodes" className="formulaire">
					<tbody><tr>
						<th colSpan={8}>Périodes</th>
					</tr>
					<tr>
						<th>Date début</th>
						<th>Date fin</th>
						<th>Type</th>
						<th>A poser</th>
						<th>Saisis</th>
						<th>Reste</th>
						<th>Pris</th>
						<th>Frac</th>
					</tr>
                    </tbody>
				</table>
				<br/>
				<div className="widget">
					<fieldset>
						<legend>Raphounet warning: </legend>
						<label htmlFor="modeHisto">Saisie antérieure
							<input type="checkbox" name="modeHisto" id="modeHisto"/>
						</label>
					</fieldset>
				</div>
            </center>
            </Col>
        </section>
    </>
    )
}


