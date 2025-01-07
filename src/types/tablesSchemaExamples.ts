export interface UserTable {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
}

export interface PostTable {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
}
