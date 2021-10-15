import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/common/models';
import { HttpService } from 'src/app/services/http.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: PostModel[] = [];
  categoryId: string;
  authorId: string;

  constructor(
    private http: HttpService,
    private router: Router,
    private activatedRpute: ActivatedRoute,
    private postService: PostService
  ) {
    this.activatedRpute.queryParams.subscribe(data => {
      if (data.categoryId) {
        this.categoryId = data.categoryId;
      }
      if (data.authorId) {
        this.authorId = data.authorId;
      }
    });
  }

  ngOnInit(): void {
    let filter: any = {};
    if (this.categoryId) {
      filter.category = this.categoryId;
    }
    if (this.authorId) {
      filter.author = this.authorId;
    }
    this.postService.fetchPosts(filter);
    this.postService.posts$.subscribe(data => {
      this.posts = data;
    });
  }

  fetchByAuthor(item: PostModel): void {
    let filter: any = {
      author: item.authorDetails.userId
    }
    this.postService.fetchPosts(filter);
  }

  fetchByCategory(item: PostModel): void {
    let filter: any = {
      category: item.categoryDetails.categoryId
    }
    this.postService.fetchPosts(filter);
  }

  getSubstring(item: PostModel): string {
    return item.body.substr(0, 100);
  }

  goToPost(id: string): void {
    this.router.navigateByUrl(`/view-post?id=${id}`);
  }

}
