export interface Word {
  finnish: string;
  english: string;
  example: string;
  id: string;
}

export interface PaginatedData {
  current_page: number;
  data: Word[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
