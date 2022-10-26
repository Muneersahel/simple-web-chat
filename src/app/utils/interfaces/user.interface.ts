export interface UserInterface {
  username: string;
}

export interface UserStateInterface {
  loading: boolean;
  username: UserInterface | null;
  error: string | null;
}
