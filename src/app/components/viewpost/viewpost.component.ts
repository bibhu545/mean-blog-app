import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/common/models';
import { HttpService } from 'src/app/services/http.service';
import { formatPostModel, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {

  postId: string;
  post: PostModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private postService: PostService
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data.id) {
        this.postId = data.id;
      }
    });
  }

  ngOnInit(): void {
    if (this.postId) {
      let filter: any = {
        postId: this.postId
      };
      this.http.post('/post/fetch', filter).subscribe({
        next: response => {
          if (response.data) {
            this.post = formatPostModel(response.data)[0] ?? new PostModel();
          }
        }
      });
    }
    else {
      this.router.navigateByUrl('/');
      return;
    }
  }

  fetchByAuthor(item: PostModel): void {
    this.router.navigateByUrl(`/?categoryId=${item.authorDetails.userId}`)
  }

  fetchByCategory(item: PostModel): void {
    this.router.navigateByUrl(`/?categoryId=${item.categoryDetails.categoryId}`)
  }

}
