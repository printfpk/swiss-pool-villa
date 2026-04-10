export default function Categories() {
  return (
    <div className="flex gap-8 mb-8 overflow-x-auto pb-4 text-[--color-text-muted] text-sm font-medium">
        <div className="flex flex-col items-center gap-2 text-[--color-text-main] border-b-2 border-[--color-text-main] pb-2 cursor-pointer whitespace-nowrap">
            <span className="text-2xl opacity-80"></span> Unique homes
        </div>
        <div className="flex flex-col items-center gap-2 hover:text-[--color-text-main] hover:border-b-2 hover:border-[#dddddd] pb-2 cursor-pointer transition whitespace-nowrap">
            <span className="text-2xl opacity-60"></span> Beachfront
        </div>
        <div className="flex flex-col items-center gap-2 hover:text-[--color-text-main] hover:border-b-2 hover:border-[#dddddd] pb-2 cursor-pointer transition whitespace-nowrap">
            <span className="text-2xl opacity-60"></span> Cabins
        </div>
        <div className="flex flex-col items-center gap-2 hover:text-[--color-text-main] hover:border-b-2 hover:border-[#dddddd] pb-2 cursor-pointer transition whitespace-nowrap">
            <span className="text-2xl opacity-60"></span> Treehouses
        </div>
    </div>
  );
}
