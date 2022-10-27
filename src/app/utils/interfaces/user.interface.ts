export interface UserInterface {
  username: string;
}

export interface UserStateInterface {
  loading: boolean;
  user: UserInterface | null;
  error: string | null;
}
