"use client"

import { ColumnDef, Row, SortingFn, sortingFns } from "@tanstack/react-table"
import { Legislation } from "app/types/legislation"

import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { compareItems } from "@tanstack/match-sorter-utils"
import { LegislativeDocument } from "app/api/types/legislationDocuments"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"

export const fuzzySort: SortingFn<any> = (rowA: Row<any>, rowB: Row<any>, columnId) => {
    let dir = 0

    const rowARank = (rowA.columnFiltersMeta[columnId] as any)?.itemRank!
    const rowBRank = (rowB.columnFiltersMeta[columnId] as any)?.itemRank!


    // Only sort by rank if the column has ranking information
    if (!!rowARank && !!rowBRank) {
        dir = compareItems(
            rowARank, rowBRank
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

/**
 * Columns for legislation data table
 * @columns biennium, billId, shortDescription 
 */
export const columns: ColumnDef<Legislation>[] = [
    {
        id: "biennium",
        accessorKey: "biennium",
        header: "Biennium",
    },
    {
        id: "billId",
        accessorKey: "billId",
        header: ({ column }) => {
            const isSortedAsc = column.getIsSorted() === "asc"
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(isSortedAsc, true)}
                >
                    ID
                    {
                        isSortedAsc ?
                            <ArrowUp className="ml-2 h-4 w-4" /> :
                            <ArrowDown className="ml-2 h-4 w-4" />
                    }
                </Button>
            )
        },
    },
    {
        id: "shortDescription",
        accessorKey: "shortDescription",
        header: "Desc",
        // sort by most relevant to search query
        sortingFn: fuzzySort
    },
    {
        id: "sponsor",
        accessorKey: "sponsor",
        sortingFn: fuzzySort,
        header: () => <div className="text-left">Sponsor</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium text-blue-800">{row.getValue("sponsor")}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const legislation = row.original

            // move to server
            // map of doc.id to document
            // map of doc.type to arr doc
            const types = new Set<string>([]);
            legislation?.documents?.forEach(doc => types.add(doc.type))

            const documentGroups = new Map<string, Array<LegislativeDocument>>([])

            types.entries().forEach(entry => {
                documentGroups.set(entry[0], [])
            })

            legislation?.documents?.forEach(doc => {
                const groupArr = documentGroups.get(doc.type)
                groupArr?.push(doc)
            })


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(legislation.billId)}
                        >
                            Copy Legislation ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {Array.from(documentGroups.entries()).map(entry => {
                            return (
                                <DropdownMenuSub key={`${legislation.biennium}${legislation.billNumber}${entry[0]}`}>
                                    <DropdownMenuSubTrigger>
                                        {entry[0]}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <ScrollArea classNameViewport="max-h-[200px] max-w-[350px]">
                                                <DropdownMenuItem
                                                    onClick={() => navigator.clipboard.writeText(legislation.billId)}
                                                >
                                                    {`${entry[0]} PDFs`}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {entry[1].map(doc => (
                                                    <DropdownMenuItem key={`${legislation.biennium}${legislation.billNumber}${doc.longFriendlyName}`}
                                                    >
                                                        <Link className="text-blue-600" passHref={true} target="_blank" href={doc.pdfUrl} >{`${doc.longFriendlyName}`}</Link>
                                                    </DropdownMenuItem>)
                                                )}
                                            </ScrollArea>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]