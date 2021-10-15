import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-blog-app';
  isLoading: boolean = false;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.commonService.loading$.subscribe(data => {
      this.isLoading = data;
    });
  }
}
