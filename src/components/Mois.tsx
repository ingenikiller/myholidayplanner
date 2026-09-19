import { useEffect, useRef, useState } from "react";
import type { IMois } from "../hooks/useMois";
import type { DataJour } from "./Jour";
import Jour from "./Jour";
import type { JourCongesFeries } from "./planner";

interface MoisProps {
    annee: number;
    mois: IMois;
    listeJoursCongesFeries: JourCongesFeries[];    
    majNbJourMois: (nMois: number, nbJours:number) => void;
    typeSaisieRef: React.RefObject<string>;
}




const Mois: React.FC<MoisProps> = ({annee, mois,listeJoursCongesFeries, majNbJourMois, typeSaisieRef}) => {

    const listeJourCalcul = useRef<number[]>(Array(32).fill(0));
    const [listeJour, setListeJour ] = useState<DataJour[]>();

    const [nbJoursTravailles, setNbJoursTravailles ] = useState<number>(0);

    const formatDate = (date:Date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

    const hasRun = useRef(false);
    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        console.log("use mois");
        let nj;
        let listeCalcul:DataJour[] = Array();
        for(nj=1; nj<=31; nj++){
            var date:Date = new Date(annee+'-'+mois.numero+'-'+nj);
            if(date.getDate() == nj){
                //console.log("trt "+ nj);
                var jour = date.getDay();

                let dateFormatee = formatDate(date);
                let jfc = listeJoursCongesFeries.find(element => element.date == dateFormatee);

                // si le jour de la semaine est en weekend ou férié ou un jour de congès
                

                if(jfc != null) {
                    if(jfc.type=="ferie") {
                        let day: DataJour= ({date: date, jourDuMois:nj, jourSemaine:jour, jourFerie:true, jourConges:"" })
                        listeCalcul.push(day);
                    } else {
                        let day: DataJour= ({date: date, jourDuMois:nj, jourSemaine:jour, jourFerie:false, jourConges:jfc.type })
                        listeCalcul.push(day);
                    }
                } else if (jour==0||
                    jour==6
                ) {
                    listeJourCalcul.current[nj]=0;
                    let day: DataJour= ({date: date, jourDuMois:nj, jourSemaine:jour, jourFerie:false, jourConges:"" })
                    listeCalcul.push(day);
                } else {
                    listeJourCalcul.current[nj]=1;
                    let day: DataJour= ({date: date, jourDuMois:nj, jourSemaine:jour, jourFerie:false, jourConges:"" })
                    listeCalcul.push(day);
                }
            } else {
                let day: DataJour= ({date: date, jourDuMois:nj, jourSemaine:-1, jourFerie:false, jourConges:"" })
                listeCalcul.push(day);
            }
        }
        setListeJour(listeCalcul);
        let nbJours=listeJourCalcul.current?.filter(jour=> jour==1).length;
        
        setNbJoursTravailles( nbJours);
        majNbJourMois( Number(mois.numero), nbJours);
    }, [mois]);

    const majJourMois = (numeroJour:number, travaille:number) => {
        listeJourCalcul.current[numeroJour]=travaille;
        let nbJours=listeJourCalcul.current?.filter(jour=> jour==1).length;
        console.log("nbJours:"+nbJours);
        setNbJoursTravailles( nbJours);
        majNbJourMois( Number(mois.numero), nbJours);
    }

    return (
        <>
            <th>{mois.mois}</th>
            {/*[...Array(31)].map((_, i) => <td>{i+1}</td>)*/}
            {
                listeJour && listeJour.map((row: DataJour) => (
                <Jour donnees={row} typeSaisieRef={typeSaisieRef} majJourMois={majJourMois}/>
            ))}
            <th>{nbJoursTravailles}</th>
        </>
    )

}

export default Mois;
