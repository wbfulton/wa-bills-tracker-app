import { RankingInfo, compareItems } from "@tanstack/match-sorter-utils";
import { Row, sortingFns } from "@tanstack/react-table";

export function fuzzySort<T>(rowA: Row<T>, rowB: Row<T>, columnId: string) {
  let dir = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowARank: RankingInfo = (rowA.columnFiltersMeta[columnId] as any)
    ?.itemRank;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowBRank: RankingInfo = (rowB.columnFiltersMeta[columnId] as any)
    ?.itemRank;

  // Only sort by rank if the column has ranking information
  if (!!rowARank && !!rowBRank) {
    dir = compareItems(rowARank, rowBRank);
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
}
