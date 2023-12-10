export interface AppEvent {
  type: string;
  data: any;
  origin: string;
  idToken: string | null;
  accessToken: string | null;
}

export interface AppResponse {
  message: string;
  success: boolean;
  data?: any;
  error?: any;
  errMessage: string | undefined | null;
  statusCode: number;
}
