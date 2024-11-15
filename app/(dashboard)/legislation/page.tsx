'use client'

import { getLegislationDetails } from "app/api/soap/getLegislationDetails";
import { getLegislationDocuments } from "app/api/soap/getLegislationDocuments";
import { getLegislationPassedLegislature } from "app/api/soap/getLegislationPassedLegislature";
import { useLegislationFilters } from "app/hooks/useFilters";
import { Agency, Biennium, CompanionLegislation, Legislation, LegislationCurrentStatus, LongLegislationType, ShortLegislationType } from "app/types/legislation";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";


// call apis in this, or other pages
async function getData(biennium: Biennium): Promise<Legislation[]> {
    try {
        // Fetch data from your API here.
        const legInfo = (await getLegislationPassedLegislature(biennium)).arrayOfLegislationInfo.legislationInfo



        const arr = await Promise.all(legInfo.map(async (info) => {

            const detail = (await getLegislationDetails(biennium, Number(info.billNumber[0])))?.arrayOfLegislation?.legislation?.[0];

            const documents = await getLegislationDocuments({ biennium, text: info.billNumber[0] })


            if (!detail) throw new Error()

            const compainDetail = detail.companions[0]
            const companions = Object.prototype.toString.apply(compainDetail) === '[object Array]' ? (compainDetail as unknown as {
                companion: {
                    biennium: [string],
                    billId: [string],
                    status: [string]
                }
            }).companion : undefined;


            const companion: CompanionLegislation | undefined = (!!companions) ? {
                biennium: companions.biennium[0] as Biennium,
                billId: companions.billId[0],
                status: companions.status[0]

            } : undefined

            const currentStatus: LegislationCurrentStatus = {
                billId: detail.currentStatus[0].billId[0],
                historyLine: detail.currentStatus[0].historyLine[0],
                actionDate: new Date(detail.currentStatus[0].actionDate[0]),
                amendedByOppositeBody: Boolean(detail.currentStatus[0].amendedByOppositeBody[0]),
                partialVeto: Boolean(detail.currentStatus[0].partialVeto[0]),
                veto: Boolean(detail.currentStatus[0].veto[0]),
                amendmentsExist: Boolean(detail.currentStatus[0].amendmentsExist[0]),
                status: detail.currentStatus[0].status[0]
            }

            const leg: Legislation = {
                biennium: info.biennium[0],
                billId: info.billId[0],
                billNumber: Number(info.billNumber[0]),
                substituteVersion: Number(info.substituteVersion[0]),
                engrossedVersion: Number(info.engrossedVersion[0]),
                shortLegislationType: info.shortLegislationType[0].shortLegislationType[0] as ShortLegislationType,
                longLegislationType: info.shortLegislationType[0].longLegislationType[0] as LongLegislationType,
                originalAgency: info.originalAgency[0] as Agency,
                active: Boolean(info.active[0]),
                stateFiscalNote: Boolean(detail.stateFiscalNote[0]),
                localFiscalNote: Boolean(detail.localFiscalNote[0]),
                appropriations: Boolean(detail.appropriations[0]),
                requestedByGovernor: Boolean(detail.requestedByGovernor[0]),
                requestedByBudgetCommittee: Boolean(detail.requestedByBudgetCommittee[0]),
                requestedByDepartment: Boolean(detail.requestedByDepartment[0]),
                requestedByOther: Boolean(detail.requestedByOther[0]),
                shortDescription: detail.shortDescription[0],
                request: detail.request[0],
                introducedDate: new Date(detail.introducedDate),

                sponsor: detail.sponsor[0],
                primeSponsorID: Number(detail.primeSponsorID[0]),
                longDescription: detail.longDescription[0],
                legalTitle: detail.legalTitle[0],
                currentStatus,
                companion,
                documents
            }

            return leg
        }))


        return arr
    } catch (error) {
        console.log(error)
        return []
    }
}



export default function LegislationTrackerPage() {
    const [data, setData] = useState<Array<Legislation>>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    const filters = useLegislationFilters();

    useEffect(() => {
        if (!filters.biennium) return;

        setLoading(true)

        getData(filters.biennium).then(data => {
            setData(data)
            setLoading(false)
        })

    }, [filters])


    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} isLoading={isLoading} />
        </div>
    )
}
