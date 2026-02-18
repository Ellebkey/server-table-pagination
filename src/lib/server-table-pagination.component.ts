import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'lib-server-table-pagination',
  templateUrl: './server-table-pagination.component.html',
  styleUrls: ['./server-table-pagination.component.scss']
})
export class ServerTablePaginationComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() limit = 0;
  @Input() offset = 0;
  @Input() count = 0;
  @Input() inputPlaceHolderText = '';
  @Input() showInputSearch = false;
  @Input() scrollElementId = '';
  @Output() filterSearchChanged: EventEmitter<{}> = new EventEmitter();

  public pages: any;
  public searchString = '';
  public currentPage = 1;
  public chunk = 0;
  public lastItemNumberOnPage = 0;
  private maxPageNumber = 5;
  private difference = 2;
  public onInputType = new Subject<string>();
  public firstLoad = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private elRef: ElementRef,
  ) {

  }

  ngOnInit(): void {
    console.log('showInputSearch:', this.showInputSearch);
    this.onInputType.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        this.updateEmitter(this.limit, 0, this.searchString);
      });
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    const divToMeasureWidth = document.getElementById('pagination-component').offsetWidth;
    console.log(divToMeasureWidth)
    if (divToMeasureWidth < 1130) {
      this.maxPageNumber = 3;
      this.difference = 1;
    }

    this.pagesConstructor();
    this.firstLoad = true;
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.firstLoad) {
      const prevPage = this.currentPage;

      // Always sync currentPage from offset
      if (this.limit > 0) {
        this.currentPage = Math.floor(this.offset / this.limit) + 1;
      }

      this.pagesConstructor();

      if (this.currentPage < prevPage) {
        this.scrollToTop();
      }
    }
  }

  private scrollToTop(): void {
    if (this.scrollElementId) {
      const scrollEl = document.getElementById(this.scrollElementId);
      if (scrollEl) {
        scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateEmitter(limit: number, offset: number, searchText: string): void {
    this.filterSearchChanged.emit({
      limit,
      offset,
      searchText
    });
  }

  onPageNumberSelected(event: any): void {
    this.limit = +event.target.value;
    this.offset = 0;
    this.currentPage = 1;
    this.pagesConstructor();
    this.updateEmitter(this.limit, this.offset, this.searchString);
  }

  pagesConstructor(): void {
    this.chunk = Math.ceil(this.count / this.limit);
    //@ts-ignore
    const pages = Array(this.chunk).fill().map((v, i) => {
      return {number: `${i + 1}`};
    });

    let initPage;
    let endPage;

    if (this.chunk <= this.maxPageNumber) {
      // If total pages are fewer than maxPageNumber, show all pages
      initPage = 0;
      endPage = this.chunk;
    } else {
      const pageDifference = this.maxPageNumber - this.currentPage;

      if (pageDifference > 1) {
        initPage = 0;
        endPage = this.maxPageNumber;
      }

      if (pageDifference <= 1) {
        const lastPageDifference = this.chunk - this.currentPage;
        initPage = this.currentPage - (this.maxPageNumber - this.difference);
        endPage = this.currentPage + this.difference;
        if (lastPageDifference < 3) {
          initPage = this.chunk - (this.maxPageNumber);
          endPage = this.chunk;
        }
      }
    }

    this.pages = pages.slice(initPage, endPage);
    this.lastItemNumberOnPage = this.chunk === this.currentPage ? this.count : this.offset + this.limit;

  }

  goFirst(): void {
    this.currentPage = 1;
    this.pagesConstructor();
    this.updateEmitter(this.limit, 0, this.searchString);
  }

  goLast(): void {
    this.offset = (this.chunk - 1) * this.limit;
    this.currentPage = this.chunk;
    this.pagesConstructor();
    this.updateEmitter(this.limit, this.offset, this.searchString);
  }

  goNext(): void {
    if (this.currentPage < this.chunk) {
      const currentNumber = this.currentPage;
      this.currentPage += 1;
      this.offset = (currentNumber) * this.limit;
      this.pagesConstructor();
      this.updateEmitter(this.limit, this.offset, this.searchString);
    }
  }

  goPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      const currentNumber = this.currentPage;
      this.offset = (currentNumber - 1) * this.limit;
      this.pagesConstructor();
      this.updateEmitter(this.limit, this.offset, this.searchString);
    }
  }

  goPage(pageNumber: number): void {
    const currentNumber = pageNumber === 1 ? 0 : pageNumber - 1;
    this.currentPage = currentNumber + 1;
    this.offset = (currentNumber) * this.limit;
    this.pagesConstructor();
    this.updateEmitter(this.limit, this.offset, this.searchString);
  }

  clearInput(): void {
    this.searchString = '';
    this.updateEmitter(this.limit, this.offset, this.searchString);
  }

  isCurrentPage(item: any): string {
    if (+item.number === this.currentPage) {
      return 'current-page';
    }
    return '';
  }
}
