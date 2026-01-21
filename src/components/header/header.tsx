import Link from "next/link";
import { LogoIcon } from "@/components/icons/logoIcon";
import { pageUrl } from "@/constants/routing";
import { PageTitle } from "./pageTitle";
import { WalletInputSection } from "./walletInputSection";

export const Header = () => {
  return (
    <header className="h-[3.375rem] border-b border-reya-mine-shaft-2 flex items-center bg-reya-cod-gray">
      <Link
        href={pageUrl.home}
        className="w-[2.8125rem] h-full flex items-center justify-center border-r border-reya-mine-shaft-2 hover:opacity-80 active:opacity-90 transition-opacity"
      >
        <LogoIcon />
      </Link>
      <div className="flex-1 grid grid-cols-3 items-center px-2">
        <div className="justify-self-start">
          <PageTitle />
        </div>
        <WalletInputSection />
      </div>
    </header>
  );
};
