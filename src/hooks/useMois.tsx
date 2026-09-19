export interface IMois{
    numero: string;
    mois: string;
}

export const useMois = (): IMois[] => {
    return [
        { numero: "01", mois: "Janvier" },
        { numero: "02", mois: "Février" },
        { numero: "03", mois: "Mars" },
        { numero: "04", mois: "Avril" },
        { numero: "05", mois: "Mai" },
        { numero: "06", mois: "Juin" },
        { numero: "07", mois: "Juillet" },
        { numero: "08", mois: "Août" },
        { numero: "09", mois: "Septembre" },
        { numero: "10", mois: "Octobre" },
        { numero: "11", mois: "Novembre" },
        { numero: "12", mois: "Décembre" },
    ];
};