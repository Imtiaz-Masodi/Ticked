import { Link } from "react-router-dom";

function NoData() {
  // ToDo: Update the img for dark mode
  return (
    <div className="max-w-screen-sm h-[80vh] mx-auto flex flex-col items-center justify-center px-2 gap-4">
      <img
        src="/assets/images/no-data.png"
        className="w-[50%]"
        alt="No data available"
      />
      <span className="text-zinc-700 dark:text-gray-300 text-center px-4 text-sm md:text-base">
        No tasks available. Start by adding a
        <Link to="/task/new" className="text-sky-500 dark:text-sky-400">
          {" "}
          new&nbsp;one!
        </Link>
      </span>
    </div>
  );
}

export default NoData;
