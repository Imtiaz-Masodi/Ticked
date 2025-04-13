import { ApiResponseStatus } from "../utils/enums";

export type ApiResponse<TPayload> = {
  status: ApiResponseStatus;
  message: string;
  payload?: TPayload;
};
