import { BillNumber, LegislationDetails } from "../types/legislation";

export const getLegislationDetails = async (biennum: string, billNumber: BillNumber): Promise<LegislationDetails> => {
    const data = await fetch(`http://localhost:8080/legislation-details/${biennum}/${billNumber}`)

    return data.json();


}

