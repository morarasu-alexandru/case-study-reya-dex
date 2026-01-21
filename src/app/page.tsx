import { PositionsTable } from "@/components/positionsTable/positionsTable";

export default function Home() {
  return (
    <div className="p-2 pb-4 border-b border-reya-mine-shaft-2">
      <h2 className="text-base font-bold text-reya-athens-gray mb-2">Positions</h2>
      <PositionsTable />
    </div>
  );
}
