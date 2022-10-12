export interface Story {
  id: number;
  title: string;
  description: string;
  draft: boolean;
  pages: Array<Page>;
}

export interface Page {
  id: number;
  pageNumber: number;
  pageText: string;
  currentPage: Boolean;
  whenReaderFinishesPage: number;
  choices: Array<Choice> | undefined;
  ending: string | undefined;
}

export interface Choice {
  id: number;
  pageNumber: number;
  text: string;
  linksToPage: number | undefined;
}
