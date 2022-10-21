export interface Story {
  id: number;
  userID: number;
  title: string;
  description: string;
  draft: boolean;
  pages: Array<Page>;
}

export interface Page {
  pageNumber: number;
  pageText: string;
  currentPage: Boolean;
  whenReaderFinishesPage: number;
  choices?: Array<Choice> | undefined;
  nextPage?: number | undefined;
}

export interface Choice {
  number: number;
  text: string;
  linksToPage: number | undefined;
}
