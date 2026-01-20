import { Aside, Footer, Header, Main } from "@/components/layout";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-reya-cod-gray text-reya-athens-gray">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Aside />
        <Main />
      </div>
      <Footer />
    </div>
  );
}
