import { BillNumber } from "app/api/types/legislationDetailed";
import { BillDocuments, legislationDocuments$ } from "app/store/legislaton-store";
import { useState, useEffect } from "react";



/**
 * Returns current store of legislation document urls
 * @returns Array of legislation document urls
 */
export const useLegislationDocuments = () => {
    const [documents, setDocuments] = useState<Map<BillNumber, BillDocuments>>(new Map());

    useEffect(() => {
        const sub = legislationDocuments$.subscribe(val => {
            setDocuments(val)
        })
        return () => sub.unsubscribe();
    }, []);

    return documents;
}