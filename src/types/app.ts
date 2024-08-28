export type User = {
  avatar_url: string;
  channels: string[] | null;
  created_at: string | null;
  email: string;
  id: string;
  is_away: boolean;
  name: string | null;
  phone: string | null;
  type: string | null;
  workspaces: string[] | null;
};

export type Channel = {
  id: string;
  members: string[] | null;
  name: string;
  regulators: string[] | null;
  user_id: string;
  workspace_id: string;
};

export type Workspace = {
  channels: string[] | null;
  created_at: string | null;
  id: string;
  image_url: string | null;
  invite_code: string | null;
  members: string[] | null;
  name: string;
  regulators: string[] | null;
  slug: string | null;
  super_admin: string;
};

export type Message = {
  channel_id: string;
  content: string | null;
  created_at: string | null;
  file_url: string | null;
  id: string;
  is_deleted: boolean | null;
  name: string | null;
  updated_at: string | null;
  user_id: string;
  workspace_id: string;
  user: User | null;
};

export interface Meta {
  currentPage: number;
  previousPage?: number | null;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface MessagePaginationResponse {
  message: string;
  data: Message[];
  meta: Meta;
}
