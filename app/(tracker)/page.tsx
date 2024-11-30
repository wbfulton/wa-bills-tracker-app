"use server";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import {
  Landmark,
  LucideCheck,
  PenBox,
  PenLine,
  Recycle,
  RefreshCcw,
  Repeat,
  Repeat2,
  Signature,
  Speech,
  SpeechIcon,
  Users,
  Vote,
} from "lucide-react";
import { Suspense } from "react";
import styles from "./page.module.scss";

const HowLegislationWorksPage = () => {
  return (
    <div>
      <div className="max-w-full py-10 lg:px-10 sm:px-6 px-4 ">
        <div className="container flex items-center justify-between space-y-2">
          <div>
            <article className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-4">
                How does the Washington State Legislature work?
              </h1>
              <p className="tracking-tight mb-2">
                The state legislature creates and passes laws. This organization
                has direct impact on the lives of Washingtonians, much more than
                federal congress.
              </p>
            </article>
            <div className={cn(styles.structureGrid, "py-4 gap-4 h-max")}>
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center h-10">
                    <Users className="h-10 w-10 mr-4" />
                    Senate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    The Senate is one of the two houses (or chambers), and it
                    holds 49 people. There is one Senator for each of the 49
                    legislative districts. A Senator serves a four-year term
                    with no limit on number of terms served.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center h-10">
                    <Users className="h-10 w-10 mr-4" />
                    House of Representatives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    The House of Representatives is one of the two houses (or
                    chambers), and it holds 98 people. There are two
                    Representatives for each of the 49 legislative districts. A
                    Representative serves a two-year term with no limit on
                    number of terms served.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center h-10">
                    <Users className="h-10 w-10 mr-4" />
                    Governors Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    The Washington State Governor holds special power in the
                    government. Elected to four-year terms (without term
                    limits), the Governor can sign, veto, or partially veto
                    legislation.
                  </CardDescription>
                  <CardDescription>
                    This office can also create Executive Orders to cabinet
                    agencies. They requires certain actions be taken and may
                    have the force and effect of law.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center h-10">
                    <Users className="h-10 w-10 mr-4" />
                    Committees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Committees are made up of Senators and Representatives to
                    review and hear testimonies on proposed legislation.
                    Committee meetings are open to the public. There are over
                    60+ committees ranging from Water Supply to Eduaction.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center h-10">
                    <Users className="h-10 w-10 mr-4" />
                    Legislative Agencies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Legislative agencies are special organizations that support
                    the Legislature. This can range from IT to the Ethics Board.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <h3 className="text-xl font-bold tracking-tight my-4">
              How does the State Legislature function?
            </h3>
            <div className={cn(styles.structureGrid, "py-4 gap-4 h-max")}>
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center">
                    <Users className="h-10 w-10 mr-4" />
                    Elections
                  </CardTitle>
                  <CardDescription className="my-2">
                    Every four years, elections are held for Senators and the
                    Governor. Every two years, elections are held for
                    Representatives.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center">
                    <Landmark className="h-10 w-10 mr-4" />
                    <span>Creation and Passage of Laws</span>
                  </CardTitle>
                  <CardDescription className="mb-2 mt-4">
                    Once a member introduces a bill, the legislative process
                    begins. The process has a number of specific steps. If the
                    bill makes it through all the steps in the chamber in which
                    it was introduced (the "first house"), it goes to the other
                    chamber (or "second house") and goes through the same steps
                    there. The bill then will then be sent to the Governor's
                    desk for approval or veto.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-start items-center">
                    <RefreshCcw className="h-10 w-10 mr-4" />
                    Legislative Cycles
                  </CardTitle>
                  <CardDescription className="mb-2 mt-4">
                    The legislative cycle is two years long, and is comprised of
                    sessions. There are two kinds of sessions: regular and
                    extraordinary, or special, sessions. The Senate and House of
                    Representatives meet in session each year to create new
                    laws, change existing laws, and enact budgets for the State.
                  </CardDescription>
                  <CardDescription className="my-2">
                    Regular sessions are mandated by the State Constitution and
                    begin the second Monday in January each year. In the
                    odd-numbered year, for example, 2005, the regular session is
                    105 days; in the even-numbered year, for example, 2006, it
                    is 60 days.
                  </CardDescription>
                  <CardDescription className="my-2">
                    Extraordinary sessions are called by the Governor to address
                    specific issues, usually the budget. There can be any number
                    of extraordinary sessions within the two-year cycle, and
                    they can last no more than 30 days.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 bg-secondary max-w-full sm:px-6 px-4 sm:pb-4 ">
        <div className="container flex items-center justify-between space-y-2 w-full">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              How are laws created?
            </h2>

            <ol className="list-decimal list-inside">
              <Separator orientation="horizontal" />
              <div className="w-full flex flex-wrap">
                <li className="text-xl font-bold tracking-tight mt-4 py-2 flex-1">
                  Prefiling
                  <div className="w-full flex flex-wrap flex-col">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      Members can prefile bills for introduction in the month
                      before session begins. Prefiled bills are officially
                      introduced the first day of the session. For regular
                      sessions, first day is second Monday in January each year
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="text-muted-foreground text-base font-normal tracking-normal text-muted-foreground">
                          Who writes the legislation?
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="my-2 text-muted-foreground text-base font-normal tracking-normal text-muted-foreground">
                            The members of the House and Senate offer
                            legislation, or bills, for consideration. The ideas
                            for bills come from a number of places:
                          </p>
                          <ul className="list-disc list-outside text-muted-foreground pl-10 text-base font-normal tracking-normal text-muted-foreground">
                            <li className="list-item">
                              something has happened in the last year that
                              inspires new legislation (for instance, the change
                              in people's perception of crime gave rise to the
                              youth violence bills that were offered during the
                              1994 Session)
                            </li>
                            <li className="list-item">
                              a member wishes to address an issue that is
                              specific to his or her district
                            </li>
                            <li className="list-item">
                              the Legislature decides to tackle a major issue
                              (such as regulatory reform)
                            </li>
                            <li className="list-item">
                              changes in technology dictate a change in the
                              State's laws, etc.
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </li>
                <div className="flex-1 flex items-center justify-center">
                  <PenBox />
                </div>
              </div>
              <Separator orientation="horizontal" />
              <div className="w-full flex flex-wrap">
                <div className="flex-1 flex items-center justify-center">
                  <Speech />
                </div>
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Introduction / First Reading
                  <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                    The first thing that happens to bills on the "floor" is
                    introduction and referral to committee. This is also
                    referred to as the bill's first reading. (Bills must have
                    three readings in each house in order to pass the
                    Legislature.)
                  </p>
                  <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                    Leadership determines to which committees bills will be
                    referred; this is usually determined by the bill's subject
                    matter. Bills that require an appropriation or that raise
                    revenue must also go to a fiscal committee for review.
                  </p>
                </li>
              </div>
              <Separator orientation="horizontal" />
              <div className="w-full flex flex-wrap">
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Committee Action
                  <div className="w-full flex flex-wrap flex-col gap-2">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      The chair of each committee works with leadership and
                      staff to schedule bills to be heard by the committee.
                      Committees hold three kinds of meetings: (1) work
                      sessions, where issues are determined and reviewed; (2)
                      public hearings, where testimony from interested parties
                      is taken; and (3) executive sessions, where the committee
                      decides how it will report the bill to the whole house.
                      Not all bills get scheduled for hearing, so a good number
                      of bills never get any further than committee.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      Bills can be reported in several fashions, the most usual
                      being do pass (pass the bill just as it is), do pass as
                      amended (pass the bill as amended by the committee), and
                      do pass substitute (the committee offers a different
                      version to take the place of the original bill). The
                      members on the prevailing side sign the "majority" report;
                      those members who disagree with the majority sign the
                      "minority" report. Not all bills coming out of committee
                      have minority reports.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      As a bill moves through the committee process, the staff
                      prepares the "bill report." The bill report includes a
                      legislative history of the bill, background on the issue,
                      a summary of the legislation, the names of those who
                      testified on the bill, and a summary of the testimony for
                      and against the bill. The bill report is edited as the
                      bill moves through the process. When the bill moves to the
                      opposite house, that house prepares a bill report as well.
                      A bill that has finally passed the Legislature would have
                      House, Senate, and Final bill reports.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      At the start of the session, both houses agree on dates by
                      which bills have to be reported out of committee in order
                      to be eligible for further consideration by the
                      Legislature. There is a "cut-off" date for bills to be out
                      of committee in the first house and one for bills to be
                      out of committee in the second house.
                    </p>
                  </div>
                </li>
                <div className="flex-1 flex items-center justify-center">
                  <LucideCheck />
                </div>
              </div>
              <Separator orientation="horizontal" />

              <div className="w-full flex flex-wrap">
                <div className="flex-1 flex items-center justify-center">
                  <LucideCheck />
                </div>
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Rules Committee
                  <div className="w-full flex flex-wrap flex-col gap-2">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      Once a bill has been reported by the appropriate
                      committee(s), the floor acts on the committee report and
                      then passes the bill to the Rules Committee. Usually, the
                      floor adopts the committee's recommendation.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      The Rules Committee is where leadership exercises the most
                      control over the process. The Rules Committee is made up
                      of members from both parties. Each member on the committee
                      gets to select two or three bills that will move on to the
                      next step in the process. Which bills a member selects
                      could be the result of a party caucus, or another member
                      approaching that member, or a piece of legislation about
                      which the member feels strongl
                    </p>
                    <ol className="list-outside">
                      <li className="text-lg tracking-tight mt-4">
                        4a. Review / White
                        <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                          The first step in the Rules Committee process is
                          called Rules Review in the House and Rules White in
                          the Senate (the report that lists the bills in this
                          step in the Senate is printed on white paper). Rules
                          Committee members review the bills and decide whether
                          or not to move them on to the next step.
                        </p>
                      </li>
                      <li className="text-lg tracking-tight mt-4">
                        4b. Consideration / Green
                        <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                          The next step is called Rules Consideration in the
                          House and Rules Green in the Senate (the report is
                          printed on green paper). Sometimes bills skip this
                          step and go to the calendar for second reading. It is
                          another step that allows leadership to control the
                          process.
                        </p>
                      </li>
                      <li className="text-lg tracking-tight mt-4">
                        4c. Calendar Planning / Bill Reports
                        <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                          The Rules Committee decides which bills will be
                          scheduled for second reading. Those bills that will
                          probably require some debate are placed on the regular
                          calendar. Those that are probably not controversial
                          may be placed on the suspension calendar in the House,
                          the consent calendar in the Senate. The Rules
                          Committee also decides whether a bill will be placed
                          on the regular calendar or the suspension/consent
                          calendar.
                        </p>
                        <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                          Each house prepares documents that list the bills
                          scheduled to be heard on the floor. The House prepares
                          "bill report books" (containing an order of contents
                          and the bill report of each bill on the calendar) and
                          "floor calendars" (a list of the bills, a brief
                          description for each, and the committee action on
                          each). The Senate prepares "calendars" (with an order
                          of contents and the bill report of each bill), and
                          "flash calendars" (the list with the brief
                          descriptions and committee actions). The Senate flash
                          calendar lists only those bills that were "pulled"
                          from Rules at the last Rules Committee meeting.
                        </p>
                      </li>
                    </ol>
                  </div>
                </li>
              </div>
              <Separator orientation="horizontal" />
              <div className="w-full flex flex-wrap">
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Second Reading / Bill Amendments
                  <div className="w-full flex flex-wrap flex-col gap-2">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      It is on second reading that the chamber discusses the
                      merits of the legislation. It is here, too, where members
                      can offer amendments to the bill. Most bills that get this
                      far get their second reading in the couple of weeks
                      following the committee cut-off.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      If a bill has been amended in committee or on the floor in
                      the first house, it is ordered engrossed. Engrossing a
                      bill means incorporating the amendments into the body of
                      the bill so that the second house gets one document. If a
                      bill has been amended in the second house, it is returned
                      to the first house with the amendments attached so that
                      the first house can decide whether or not it wishes to
                      agree with the changes the second house made.
                    </p>
                  </div>
                </li>
                <div className="flex-1 flex items-center justify-center">
                  <SpeechIcon />
                </div>
              </div>
              <Separator orientation="horizontal" />

              <div className="w-full flex flex-wrap">
                <div className="flex-1 flex items-center justify-center">
                  <Vote />
                </div>
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Third Reading / House Vote
                  <div className="w-full flex flex-wrap flex-col">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      Third reading is where the roll call vote on final passage
                      is taken. If the bill finally passes, it continues in the
                      process. If the bill fails on final passage, it goes no
                      further. Under certain circumstances, the chamber may
                      decide to reconsider the vote that was taken; in that
                      case, the chamber has twenty-four hours to make a motion
                      to reconsider the bill.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      If the bill passes third reading in the second house and
                      the second house did not amend the bill, the bill has
                      passed the Legislature.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      At the start of the session, both houses agree on
                      "cut-off" dates by which bills have to be finally passed
                      out of the first house and finally passed out of the
                      second house.
                    </p>
                  </div>
                </li>
              </div>
              <Separator orientation="horizontal" />

              <div className="w-full flex flex-wrap">
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Repeat Process in opposing House
                  <div className="w-full flex flex-wrap flex-col">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      Once legislation has completed the process described, it
                      must go through the same process in the other house. If
                      the bill has been engrossed (ammended), the other house
                      will receieve that version of the bill.
                    </p>
                  </div>
                </li>
                <div className="flex-1 flex items-center justify-center">
                  <Repeat />
                </div>
              </div>
              <Separator orientation="horizontal" />

              <div className="w-full flex flex-wrap">
                <div className="flex-1 flex items-center justify-center">
                  <Repeat2 />
                </div>
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Concurrence, Displute, and Conference Committes
                  <div className="w-full flex flex-wrap flex-col gap-2">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      If the bill has been amended by the second house, the
                      first house has to decide whether it will concur in the
                      amendments or not. Leadership decides which bills returned
                      from the second house will be discussed and places those
                      bills on the concurrence calendar (House) or concurring
                      calendar (Senate). If the first house concurs in the
                      amendments, the bill has passed the Legislature.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      If the first house disagrees with the second house, it can
                      ask the second house to recede from the amendments. If the
                      second house recedes, the bill has passed the Legislature.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      If the two houses cannot resolve their differences, one of
                      them can ask for a conference committee. Members from each
                      house meet to discuss the differences. If they agree on
                      what is to be done, the conference committee makes a
                      report. Both houses must adopt the conference committee
                      report for the bill to pass the Legislature. If one house
                      does not adopt the conference committee report (whether by
                      vote or inaction), the bill has not passed. The House
                      Floor Activity Report and the Senate Floor Activity Report
                      list the bills on the concurrence, dispute, and conference
                      calendars.
                    </p>
                  </div>
                </li>
              </div>
              <Separator orientation="horizontal" />

              <div className="w-full flex flex-wrap">
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Enrolling
                  <div className="w-full flex flex-wrap gap-2 flex-col">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      Once a bill has finally passed the Legislature, it is
                      enrolled. A certificate proclaiming that it has passed is
                      attached and, if necessary, the amendments from the second
                      house or conference committee are incorporated into the
                      body of the bill. The bill is signed by the Speaker of the
                      House, the Chief Clerk of the House, the President of the
                      Senate, and the Secretary of the Senate and is sent to the
                      Governor for his or her action.
                    </p>
                  </div>
                </li>
                <div className="flex-1 flex items-center justify-center">
                  <PenLine />
                </div>
              </div>
              <Separator orientation="horizontal" />

              <div className="w-full flex flex-wrap">
                <div className="flex-1 flex items-center justify-center">
                  <Signature />
                </div>
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Governor's Actions
                  <div className="w-full flex flex-wrap gap-2 flex-col">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      The Governor reviews the bill. The Governor may decide to
                      sign it, veto part of it, or veto all of it. If the
                      Governor vetoes part or all of it, the Legislature may
                      vote to override the veto. (That happens rarely.) If the
                      governor does not act on a bill after the allotted number
                      of days, it is as if it was signed. From the Governor's
                      desk, bills go to the Secretary of State who assigns a
                      session law chapter number. The Chapter to Bill Table
                      lists the bills that have passed the Legislature, the
                      chapter numbers assigned by the Secretary of State,
                      vetoes, short descriptions, and the effective dates.
                    </p>
                  </div>
                </li>
              </div>
              <Separator orientation="horizontal" />

              <div className="w-full flex flex-wrap">
                <li className="text-xl font-bold tracking-tight mt-4 flex-1">
                  Legislation Carryover
                  <div className="w-full flex flex-wrap gap-2 flex-col">
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      The Legislature works within the framework of a two-year
                      cycle. For instance, the 2005-06 Session is the 59th
                      Session of the Legislature. There will be a least two
                      regular sessions, a "long" session in 2005 (105 days) and
                      a "short" session in 2006 (60 days). There could also be
                      any number of special sessions, none of which can last
                      longer than 30 days.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      Therefore, just because a bill did not make it all the way
                      through during the regular session in the odd-numbered
                      year (for example, 2005) does not mean it is "dead." At
                      the end of the session, all bills in the second house are
                      returned to the first house; so a House bill in committee
                      in the Senate when session ends is returned to the House.
                      At the start of the next session, be it a special session
                      or the next regular session, bills from the previous
                      session are reintroduced and retained in their present
                      position.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      "Carryover" bills can be taken up again in subsequent
                      sessions during the biennium. The Legislature has a lot of
                      latitude with these bills. The first house can place the
                      bill on the calendar for third reading and send it right
                      back to the second house, or it can make the bill go to
                      committee and through the whole process again.
                    </p>
                    <p className="text-base font-normal my-2 tracking-normal text-muted-foreground">
                      This is in addition to the new bills introduced during the
                      current session. This procedure can make it difficult to
                      keep track of bills during a special session or the second
                      regular session. If a bill does not make it through the
                      process by the end of the two-year cycle, it is "dead."
                    </p>
                  </div>
                </li>
                <div className="flex-1 flex items-center justify-center">
                  <Recycle />
                </div>
              </div>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  return (
    <Suspense fallback={null}>
      <HowLegislationWorksPage />
    </Suspense>
  );
}
