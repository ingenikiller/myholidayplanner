import { useEffect, useRef, useState } from "react";


export interface DataJour {
    date: Date;
    jourDuMois: number;
    jourSemaine: number;
    jourFerie:boolean;
    jourConges:string
}

interface JourProps {
    donnees: DataJour;
    typeSaisieRef: React.RefObject<string>;
    majJourMois: (nJour: number, travaille:number) => void;
    /*fluxData: FluxDisplay;    
    DetailOperations: (fluxId: number, periode: string) => void;*/
}

const Jour: React.FC<JourProps> = ({donnees, typeSaisieRef, majJourMois}) => {

    const tabJour=['D', 'L', 'M', 'M', 'J', 'V', 'S'];

    const [ className, setClassName ] = useState<string>("");
    
    const hasRun = useRef(false);
     useEffect(() => {
            if (hasRun.current) return;
            hasRun.current = true;
            //console.log("use day "+donnees.date.toString());
            if(donnees.jourFerie) {
                setClassName("jour_ferie");
            } else if (donnees.jourConges!='') {
                setClassName(donnees.jourConges);
            } else if (donnees.jourSemaine==0 ||
                donnees.jourSemaine==6 
            ) {
                setClassName("jour_ferme");
            } else {
                setClassName("jour_ouvre");
            }
            
        }, [donnees]);

    
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = () => {
    if (timer.current) return;

    timer.current = setTimeout(() => {
        console.log("simple clic");
        timer.current = null;
        traiteClic(1);
    }, 250);
        
    };

    const handleDoubleClick = () => {
    if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
    }

    console.log("double clic");
    traiteClic(2);
    };

    const traiteClic= (nbClic:number) => {
        console.log("Traite clic " + nbClic);
        console.log("Saisie:"+typeSaisieRef.current);

        let dateDuJour = new Date();
        if( dateDuJour>donnees.date) {
            console.log("trop tard");
            return;
        }

        //si le jour est tombe un weekend ou est férié, on stoppe
        if(donnees.jourSemaine==0 ||
            donnees.jourSemaine==6 ||
            donnees.jourFerie) {
            console.log("ferie ou ferme");
            return ;
        }

        let typeNouveau:string=typeSaisieRef.current+nbClic.toString();
        if(typeNouveau==className) {
            return;
        }
        setClassName(typeNouveau);
        majJourMois(donnees.jourDuMois, typeNouveau=="inactif"?1:0);
    }
    
    return (
        <td className={className}
            onClick={()=>handleClick()}
            onDoubleClick={()=>handleDoubleClick()}
        >
            {donnees.jourSemaine!=-1 && <img src={'../src/assets/'+tabJour[donnees.jourSemaine]+'.png'}/>}
        </td>
    )
}

export default Jour;