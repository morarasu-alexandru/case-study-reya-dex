import { FooterLinks } from "./footerLinks";
import { UtcClock } from "./utcClock";

export const Footer = () => {
  return (
    <footer className="h-[2.125rem] border-t border-reya-mine-shaft-2 flex items-center justify-between p-2 bg-reya-cod-gray-2">
      <UtcClock />
      <FooterLinks />
    </footer>
  );
};
