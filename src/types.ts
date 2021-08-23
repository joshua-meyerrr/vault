export type Credential = {
  _id?: string;
  service: string;
  username: string;
  password: string;
};

export type DB = {
  credentials: Credential[];
};
