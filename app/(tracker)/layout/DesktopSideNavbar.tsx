import { VercelLogo } from "@/components/icons";
import { NavItem } from "@/components/ui/NavItem";
import { Landmark, Settings, Users2 } from "lucide-react";

export const DesktopSideNavbar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem
          href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs"
          label="Wa Bill Tracker"
        >
          <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
        </NavItem>

        <NavItem href="/legislation" label="All Legislation">
          <Landmark className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="House">
          <Landmark className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="Senate">
          <Landmark className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="Politicians">
          <Users2 className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="#" label="Settings">
          <Settings className="h-5 w-5" />
        </NavItem>
      </nav>
    </aside>
  );
};
