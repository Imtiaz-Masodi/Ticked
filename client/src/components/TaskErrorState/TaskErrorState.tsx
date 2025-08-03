import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { ButtonType, ButtonVariant } from "../Button/Button.enum";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { Size } from "../../utils/enums";

type TaskErrorStateProps = {
  className?: string;
};

function TaskErrorState({ className = '' }: TaskErrorStateProps) {
  const navigate = useNavigate();

  return (
    <div className={`${className} h-full px-4`}>
      <div className="max-w-md mx-auto my-8">
        <div className="p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Icon name={Icons.warning} className="text-red-500 dark:text-red-400" />
          </div>
          
          {/* Error Message */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Task Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            The task you're looking for doesn't exist or failed to load. It may have been deleted or you don't have permission to view it.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button type={ButtonType.outline} size={Size.sm} variant={ButtonVariant.info} startIcon={Icons.arrowBack} onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button type={ButtonType.solid} size={Size.sm} variant={ButtonVariant.info} endIcon={Icons.task} onClick={() => navigate('/')}>
              Items List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskErrorState;
