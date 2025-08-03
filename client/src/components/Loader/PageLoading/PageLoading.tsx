import CircularLoader from "../CircularLoader/CircularLoader";
import { Size } from "../../../utils/enums";

interface PageLoadingProps {
  text?: string;
  size?: Size;
}

const PageLoading = ({ text = "Loading...", size = Size.lg }: PageLoadingProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-8">
      <CircularLoader size={size} className="text-blue-500" />
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">{text}</p>
    </div>
  );
};

export default PageLoading;
