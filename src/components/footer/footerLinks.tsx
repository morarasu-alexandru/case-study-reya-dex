import Link from "next/link";

export const FooterLinks = () => {
  return (
    <div className="flex items-center text-xs">
      <Link
        href="https://docs.reya.network"
        target="_blank"
        rel="noopener noreferrer"
        className="text-reya-athens-gray hover:opacity-80 transition-opacity border-r border-reya-mine-shaft-2 pr-6"
      >
        Docs <span className="font-bold">↗</span>
      </Link>
      <span className="text-reya-tundora px-6 border-r border-reya-mine-shaft-2">Support</span>
    </div>
  );
};
