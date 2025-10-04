import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { ButtonType, ButtonVariant } from "../Button/Button.enum";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { Size } from "../../utils/enums";
import { APP_ROUTES } from "../../utils/routes";
import { getErrorConfig } from "./ApiErrorState.helper";
import { ApiErrorStateProps } from "./ApiErrorState.type";

function ApiErrorState({
  error,
  title,
  message,
  onRetry,
  showBackButton = true,
  showHomeButton = true,
  showRetryButton,
  className = "",
}: ApiErrorStateProps) {
  const navigate = useNavigate();

  const config = getErrorConfig(error);
  const shouldShowRetry = showRetryButton ?? (config.defaultRetry && onRetry);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior - reload the page
      window.location.reload();
    }
  };

  return (
    <div className={`${className} h-[60vh] max-w-md mx-auto px-4 flex items-center`}>
      <div className="p-8 text-center w-full">
        {/* Error Icon */}
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${config.bgColor} flex items-center justify-center`}>
          <Icon name={config.icon} className={config.iconColor} />
        </div>

        {/* Error Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{title || config.defaultTitle}</h2>

        {/* Error Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">{message || config.defaultMessage}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {shouldShowRetry && (
            <Button
              type={ButtonType.solid}
              size={Size.sm}
              variant={ButtonVariant.info}
              startIcon={Icons.refresh}
              onClick={handleRetry}
              className="order-1 sm:order-1"
            >
              Retry
            </Button>
          )}

          {showBackButton && (
            <Button
              type={ButtonType.outline}
              size={Size.sm}
              variant={ButtonVariant.info}
              startIcon={Icons.arrowBack}
              onClick={() => navigate(-1)}
              className="order-2 sm:order-2"
            >
              Go Back
            </Button>
          )}

          {showHomeButton && (
            <Button
              type={ButtonType.outline}
              size={Size.sm}
              variant={ButtonVariant.info}
              endIcon={Icons.task}
              onClick={() => navigate(APP_ROUTES.HOME)}
              className="order-3 sm:order-3"
            >
              Home
            </Button>
          )}
        </div>

        {/* Debug Info in Development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="text-xs text-gray-500 cursor-pointer">Debug Information</summary>
            <pre className="text-xs text-gray-400 mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded overflow-auto">
              {JSON.stringify(config.defaultMessage, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default ApiErrorState;
