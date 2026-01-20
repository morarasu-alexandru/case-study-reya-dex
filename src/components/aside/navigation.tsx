import { OverviewIcon } from "@/components/icons/overviewIcon";
import { pageUrl } from "@/constants/routing";
import { NavLink } from "./navLink";

export const Navigation = () => {
  return (
    <div>
      <div className="flex items-center gap-2 px-3 py-2.5 border border-reya-mine-shaft-2 bg-reya-mine-shaft rounded-lg text-sm text-reya-athens-gray">
        <OverviewIcon />
        <span>Overview</span>
      </div>
      <nav className="px-3">
        <ul>
          <li>
            <NavLink href={pageUrl.home}>Portfolio Overview</NavLink>
          </li>
          <li>
            <NavLink href={pageUrl.secondPage}>Second Page</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
