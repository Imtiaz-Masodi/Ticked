export type ServiceReturnType<TPayload = void> = {
  success: boolean;
  message?: string;
  payload?: TPayload;
};
