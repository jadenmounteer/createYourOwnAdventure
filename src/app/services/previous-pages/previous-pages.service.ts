import { Injectable } from '@angular/core';
import { Page } from 'src/app/types/types';

interface PageStack<Page> {
  push(item: Page): void;
  pop(): Page | undefined;
  peek(): Page | undefined;
  size(): number;
}

// This is a stack inspired by this blog:
// https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld
@Injectable({
  providedIn: 'root',
})
export class PreviousPagesService<Page> implements PageStack<Page> {
  private storage: Page[] = [];

  constructor() {}

  public push(page: Page): void {
    this.storage.push(page);
  }

  public pop(): Page | undefined {
    return this.storage.pop();
  }

  public peek(): Page | undefined {
    return this.storage[this.size() - 1];
  }

  public size(): number {
    return this.storage.length;
  }
}
