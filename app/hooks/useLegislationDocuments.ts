import {
  BillDocuments,
  legislationDocuments$,
} from "app/store/legislaton-store";
import { useEffect, useState } from "react";

/**
 * Returns current store of legislation document urls
 * @returns Array of legislation document urls
 */
export const useLegislationDocuments = () => {
  const [documents, setDocuments] = useState<Map<number, BillDocuments>>(
    new Map()
  );

  useEffect(() => {
    const sub = legislationDocuments$.subscribe((val) => {
      setDocuments(val);
    });
    return () => sub.unsubscribe();
  }, []);

  return documents;
};
