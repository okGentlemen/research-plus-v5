export interface AppState {
  // Add state types as needed
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}