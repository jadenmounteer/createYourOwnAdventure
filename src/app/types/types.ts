export interface Story {
  id: number | undefined;
  userID: number | undefined;
  title: string | undefined;
  description: string | undefined;
  draft: boolean;
  pages: Array<Page>;
}

export interface Page {
  pageNumber: number;
  pageText: string | undefined;
  currentPage: Boolean;
  whenReaderFinishesPage: number | undefined;
  choices?: Array<Choice> | undefined;
  nextPage?: number | undefined;
}

export interface Choice {
  number: number;
  text: string;
  linksToPage: number | undefined | string;
}
