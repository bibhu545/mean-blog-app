import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'mean-blog-app';
  isLoading: boolean = false;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.commonService.loading$.subscribe(data => {
      this.isLoading = data;
    });
  }
}
