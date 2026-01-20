import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="h-[3.375rem] border-b border-reya-mine-shaft-2 flex items-center px-4 bg-reya-cod-gray">
      <Logo />
      <span className="flex-1 text-center text-reya-gray">Header</span>
    </header>
  );
};
