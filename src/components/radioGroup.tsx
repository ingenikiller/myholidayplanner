import { useEffect, useState } from "react";

interface RadioGroupProps {
    name: string;

    listeOptions: [string, string][];
    defaultValue: string;
    //value: string;
    onChange: (value: string) => void;
    //typeSaisieRef: React.RefObject<string>;
    /*fluxData: FluxDisplay;    
    DetailOperations: (fluxId: number, periode: string) => void;*/
}

const RadioGroup: React.FC<RadioGroupProps> = ({name,listeOptions,defaultValue, onChange}) => {
  const [value, setValue] = useState("option1");

    useEffect(() => {
            //if (hasRun.current) return;
            //hasRun.current = true;
            
            setValue(defaultValue);
        }, [defaultValue]);

    const modif = (value:string) => {
        //console.log("modif:"+value);
        setValue(value);
        onChange(value);
    }

  return (
    <div className="radio-group">
        {listeOptions && listeOptions.map((row, index) => (
                <label className={`radio-card ${value === row[0] ? "selected" : ""} ${index === 0 ? "first" : ""} ${index === listeOptions.length-1 ? "last" : ""}`}>
                    <input
                    type="radio"
                    name={name}
                    value={row[0]}
                    checked={value === row[0]}
                    onChange={(e) => modif(e.target.value)}
                    />
                    <span>{row[1]}</span>
                </label>
            ))
        }
    </div>
  );
}

export default RadioGroup;
