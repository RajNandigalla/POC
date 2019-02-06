import { Component, OnInit } from '@angular/core';
import { Subject, from, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

declare var showdown: any;

export interface IMarkEvent {
  markdown: string;
  markhtml: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public toggle = true;
  public markdown = '';
  public markhtml = '';

  public search: Subject<string> = new Subject<string>();

  public markdownChange = (event: IMarkEvent) => {
    this.markdown = event.markdown;
    this.markhtml = event.markhtml;

    console.log(event);
  }

  public modelChange = (event: string) => this.search.next(event);

  ngOnInit(): void {
    this.search
      .pipe(debounceTime(500),
        distinctUntilChanged(),
        switchMap(item => of(this.parseMarkDownToHtml(item))))
      .subscribe(r => {
        console.log(r);
        this.markhtml = r;
      });
  }

  public parseMarkDownToHtml = (data: string): string => this.showdownInitialize().makeHtml(data);

  public showdownInitialize = (): any => {
    const italic = {
      type: 'output',
      regex: '\/\/(.*)\/\/',
      replace: '<i>$1</i>'
    };

    const pattern = /([^|\]\]\[\[]+)/g;
    const anchor = {
      type: 'output',
      regex: pattern,
      replace: 'world'
    };

    return new showdown.Converter({ extensions: [italic, anchor] });
  }

}
