import { BillId, LegislationDetails } from "../types/legislation";

export const getLegislationDetails = async (biennum: string, billId: BillId): Promise<LegislationDetails> => {
    const data = await fetch(`http://localhost:8080/legislation-details/${biennum}/${billId}`)

    return data.json();


}

