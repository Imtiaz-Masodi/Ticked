import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

function NotFound() {
  return (
    <div className="max-w-screen-sm h-[100vh] mx-auto flex flex-col items-center justify-center px-6 gap-6">
      <Header onMenuIconClick={() => {}} />
      <div className="text-6xl font-bold text-sky-500 select-none">404</div>
      <h1 className="text-2xl font-semibold text-zinc-800 select-none">Page Not Found</h1>
      <p className="text-zinc-600 text-center select-none">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-4 px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
