import HotTable from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import { Menu } from './menu';
import { useEffect, useRef, useState } from 'react';
import { apiClient } from '../core/ApiClient';
import type { Periode } from '../interfaces/periodes';
import type { CellChange } from 'handsontable';
import { registerLanguageDictionary, frFR } from 'handsontable/i18n';
import { Col, Row } from 'react-bootstrap';


registerAllModules();
registerLanguageDictionary(frFR);

const Periodes = () => {

    const [listePeriodes, setListePeriodes] = useState<Periode[]>();

    const hasRun = useRef(false);
    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        apiClient.post("api.php?domaine=periode&service=getliste").then((response: any) => {
            setListePeriodes(response.data.racine.ListePeriodes.data);
        });
    })

    const sauvePeriode = (changes: CellChange[] | null) => {
        changes?.forEach(([row, prop, oldValue, newValue]) => {
            console.log("row:" + row);
            console.log("prop:" + prop);
            let r: string = "" + prop;
            if (oldValue != newValue) {
                const obj: Record<string, unknown> = {};
                obj["idperiode"] = "" + listePeriodes?.at(row)?.idperiode;
                obj[String(prop)] = newValue;
                apiClient.post("api.php?domaine=periode&service=update", "periode=" + JSON.stringify(obj)).then((response: any) => {
                    console.log(response);
                });
            }
        });
    }

    const tabTrad = {
        previousMonth: 'Mois précédent',
        nextMonth: 'Next Month',
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aoùt', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    };



    return (
        <>
            <Menu />
            <br />
            <Row>
                <Col sm={2}></Col>
                <Col sm={6}>
                {listePeriodes &&
                    <HotTable
                        data={listePeriodes}
                        //theme={classicTheme}
                        colorScheme={'light'}
                        locale={'fr-FR'}
                        rowHeaders={true}
                        colHeaders={['idperiode', 'Date début', 'Date fin', 'Type période', 'Nombre de jours', 'Affichage']}
                        tableClassName={['table', 'table-hover', 'table-striped']}
                        colWidths={[1, 100, 100, 120, 100, 90, 80]}
                        language={'fr-FR'}
                        columns={[
                            { data: 'idperiode', readOnly: true, hiddenColumns: true },
                            {
                                data: 'debut',
                                type: 'date',
                                dateFormat: { day: '2-digit', month: '2-digit', year: 'numeric' }
                            },
                            {
                                data: 'fin',
                                type: 'date',
                                dateFormat: { day: '2-digit', month: '2-digit', year: 'numeric' }
                            },
                            {
                                data: 'typePeriode',
                                type: 'dropdown',
                                source: ['rtt', 'conges', 'cps', 'cpa']
                            },
                            { data: 'nbjour', type: 'numeric', pattern: '0', culture: 'fr-FR',numericFormat: { minimumFractionDigits:0} },
                            { data: 'affichage', type: 'checkbox', checkedTemplate: '1', uncheckedTemplate: '0', className: "htCenter" }
                        ]}
                        height="auto"
                        autoWrapRow={true}
                        autoWrapCol={true}
                        licenseKey="non-commercial-and-evaluation" // for non-commercial use only+
                        //hiddenColumns= {true}
                        hiddenColumns={{ columns: [0], indicators: true }}
                        afterChange={sauvePeriode}
                    />
                }
            </Col>
            </Row>
        </>
    )
}

export default Periodes;
