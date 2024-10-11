export interface User {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  bio: string;
  pk: number;
  links: [Link];
}

interface Link {
  id: number;
}
