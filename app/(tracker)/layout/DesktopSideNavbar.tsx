import { VercelLogo } from "@/components/icons";
import { NavItem } from "@/components/ui/NavItem";
import {
  CircleDollarSign,
  GraduationCap,
  Landmark,
  Scale,
  Settings,
  Users2,
} from "lucide-react";

// lectern
// handshake

export const DesktopSideNavbar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="/" label="Wa Bill Tracker">
          <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
        </NavItem>

        <NavItem href="/" label="How WA Legislation Works">
          <GraduationCap className="h-5 w-5" />
        </NavItem>

        <NavItem href="/legislation" label="Legislation">
          <Landmark className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="Laws">
          <Scale className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="Politicians">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="Political Donations">
          <CircleDollarSign className="h-5 w-5" />
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
