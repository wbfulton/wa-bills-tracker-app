"use client"

import { ColumnDef, Row, SortingFn, sortingFns } from "@tanstack/react-table"
import { Legislation } from "app/types/legislation"

import { ArrowDown, ArrowUp, MoreHorizontal, ScrollText } from "lucide-react"


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
import { InfoPopoverButton } from "@/components/ui/InfoPopoverButton"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { compareItems } from "@tanstack/match-sorter-utils"
import { LegislativeDocument } from "app/api/types/legislationDocuments"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
        id: "billId",
        accessorKey: "billId",
        header: ({ column }) => {
            const isSortedAsc = column.getIsSorted() === "asc"
            return (
                <div className="flex items-center">
                    <Button
                        className="p-0"
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
                    <InfoPopoverButton title={"Legislation ID"} description={"Prefix and bill number of a piece of legislation.  When paired with the biennium, it is a unique * reference to legislation.  This field is commonly used for display purposes on legislative reports. e.g 'HB 1001', '2SHB 1000'"} align="center" side="top" />
                </div >
            )
        },
    },
    {
        id: "shortDescription",
        accessorKey: "shortDescription",
        header: () => {
            return (
                <div className="flex items-center">
                    Description
                    <InfoPopoverButton title={"Short Description"} description={"Brief description of the legislation.  This is commonly used on legislative reports to briefly describe the topic of the legislation. e.g. 'Salmon recovery'"} align="center" side="top" />
                </div>
            )
        },
        // sort by most relevant to search query
        sortingFn: fuzzySort
    },
    {
        id: "sponsor",
        accessorKey: "sponsor",
        sortingFn: fuzzySort,
        header: () => {
            return (
                <div className="flex items-center">
                    Sponsor
                    <InfoPopoverButton title={"Sponsor"} description={"Common display string of sponsor name.  If the bill is a committee, the string will contain the committee acronym followed by the primary sponsor of the original bill in parens. e.g. 'Smith', 'CB(Smith)'"} align="center" side="top" />
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-left font-medium text-blue-800">{row.getValue("sponsor")}</div>
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <div className="flex items-center">
                    Documents and More
                </div>
            )
        },
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
                <div>
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open documents</span>
                                        <ScrollText className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Documents</p>
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Documents</DropdownMenuLabel>
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
                                                    <DropdownMenuLabel>
                                                        {`${entry[0]} PDFs`}
                                                    </DropdownMenuLabel>
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
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Actions</p>
                            </TooltipContent>
                        </Tooltip>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(legislation.billId)}
                            >
                                Copy Legislation ID
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]