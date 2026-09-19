import { useEffect } from "react";

import type { Periode } from "../interfaces/periodes";
import Annee from "./Annee";
import type { JourCongesFeries } from "./planner";

interface CalendarProps {
    listePeriodes: Periode[];
    listeJoursCongesFeries: JourCongesFeries[];
    typeSaisieRef: React.RefObject<string>;
    /*fluxData: FluxDisplay;    
    DetailOperations: (fluxId: number, periode: string) => void;*/
}

const Calendar: React.FC<CalendarProps> = ({listePeriodes, listeJoursCongesFeries, typeSaisieRef}) => {

    //const hasRun = useRef(false);



    useEffect(() => {
            //if (hasRun.current) return;
            //hasRun.current = true;
            
        }, [listePeriodes]);


    return (
        <table className="calendrier">
            <tbody>
                <tr>
                    <td colSpan={2}/>
                    {[...Array(31)].map((_, i) => <th>{i+1}</th>)}
                </tr>
                { listePeriodes && listePeriodes.map((row: Periode) => (
                    <Annee periode={row} listeJoursCongesFeries={listeJoursCongesFeries} typeSaisieRef={typeSaisieRef}/>
                ))}
            </tbody>
        </table>
    )
}

export default Calendar; 
