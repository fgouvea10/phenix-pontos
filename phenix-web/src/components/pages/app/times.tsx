type ClockInProps = {
  type: "in-progress" | "done" | "inconsistent";
};

export function ClockInCard({ type }: ClockInProps) {
  const ClockInTypeViews = {
    "in-progress": () => (
      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
        Em andamento
      </span>
    ),
    done: () => (
      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
        Em andamento
      </span>
    ),
    inconsistent: () => (
      <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
        Em andamento
      </span>
    ),
  };

  const ClockInSpecificView =
    ClockInTypeViews[type] ?? ClockInTypeViews["in-progress"];

  return (
    <div className="bg-gray-50 border border-gray-200">
      <span className="p-4 block text-stone-400 font-light">
        Batido em 12/12/2023
      </span>
      <div className="w-full h-[1px] bg-gray-200" />
      <div className="flex w-full flex-col p-4">
        <div className="flex items-center gap-2">
          <strong className="block font-regular text-stone-900 text-2xl">
            08:36
          </strong>
          <ClockInSpecificView />
        </div>
        <div className="block mt-6">
          <ol className="flex items-center w-full">
            <li className="lex w-full items-center text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block">
              <span className="w-auto h-auto bg-black" />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
