import { LegislationDetails } from "../types/legislationDetailed";

export const getLegislationDetails = async (biennium: string, billNumber: number): Promise<LegislationDetails> => {
    try {
        const data = await fetch(`http://localhost:8080/legislation-details/${biennium}/${billNumber}`)

        return data.json();
    } catch (error) {
        console.log(error)

        return new Promise(() => [])
    }


}

