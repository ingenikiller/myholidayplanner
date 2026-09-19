import { useEffect, useState } from "react";
import type { Periode } from "../interfaces/periodes";
import { useMois, type IMois } from "../hooks/useMois";
import Mois from "./Mois";
import type { JourCongesFeries } from "./planner";

interface AnneeProps {
    periode: Periode;
    listeJoursCongesFeries: JourCongesFeries[];
    typeSaisieRef: React.RefObject<string>;
    /*fluxData: FluxDisplay;    
    DetailOperations: (fluxId: number, periode: string) => void;*/
}

const Annee: React.FC<AnneeProps> = ({periode, listeJoursCongesFeries, typeSaisieRef}) => {
    
    const listeMois = useMois(); 
    
    var tabJoursTravaillesMois:number[]=Array(12);

    const [ nbJoursTravailes, setNbJoursTravailles ] = useState<number>(0);

    useEffect(() => {
            
            }, [periode]);

    const majJoursTravailles = (nMois: number, nbJours:number) => {
        tabJoursTravaillesMois[nMois]=nbJours;
        let total=0;
        for( var element of tabJoursTravaillesMois) {
            total+=isNaN(element)?0: element;
        }
        setNbJoursTravailles(total);
    }
    
    return (
        <>
            {listeMois && listeMois.map((row: IMois) => (
                <tr>
                    {row.numero=='01' && <th rowSpan={12}>{periode.annee}</th>}
                    <Mois annee={periode.annee} mois={row} majNbJourMois={majJoursTravailles} listeJoursCongesFeries={listeJoursCongesFeries} typeSaisieRef={typeSaisieRef}/>
                </tr>    
            ))}
            <tr>
                <td colSpan={2}/>
                {[...Array(31)].map((_, i) => <th>{i+1}</th>)}
                <th>{nbJoursTravailes}</th>
            </tr>
        </>
    )

}

export default Annee;
