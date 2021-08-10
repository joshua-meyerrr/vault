export type Credential = {
  service: string;
  username: string;
  password: string;
};

export type DB = {
  credentials: Credential[];
};
