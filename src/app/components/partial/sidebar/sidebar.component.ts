import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DDLModel } from 'src/app/common/models';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: DDLModel[] = [];

  constructor(
    private http: HttpService,
    private commonService: CommonService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.commonService.setLoding(true)
    this.http.get('/categories').subscribe({
      next: response => {
        this.categories = response?.data?.map(r => new DDLModel(r._id, r.name));
      },
      error: err => {
        console.log(err);
      }
    }).add(() => this.commonService.setLoding(false));
  }

  fetchByCategory(item: DDLModel): void {
    let filter: any = {
      category: item.value
    }
    this.postService.fetchPosts(filter);
    this.router.navigateByUrl('/');
  }

}
