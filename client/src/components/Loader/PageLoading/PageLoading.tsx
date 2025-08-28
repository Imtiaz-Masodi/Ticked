import CircularLoader from "../CircularLoader/CircularLoader";
import { Size } from "../../../utils/enums";

interface PageLoadingProps {
  text?: string;
  size?: Size;
  fullScreen?: boolean;
}

const PageLoading = ({ text = "Loading...", size = Size.lg, fullScreen = true }: PageLoadingProps) => {
  return (
    <div className={`w-full ${fullScreen ? "h-[calc(100vh-128px)]" : "h-full"} flex flex-col items-center justify-center`}>
      <CircularLoader size={size} className="text-blue-500" />
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">{text}</p>
    </div>
  );
};

export default PageLoading;
