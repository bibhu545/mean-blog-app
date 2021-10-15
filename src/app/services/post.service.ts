import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryModel, PostModel, UserModel } from '../common/models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Subject<PostModel[]> = new Subject<PostModel[]>();
  posts$ = this.posts.asObservable();

  constructor(
    private http: HttpService
  ) { }

  fetchPosts(filter: any): void {
    this.http.post('/post/fetch-all', filter).pipe(take(1)).subscribe({
      next: response => {
        this.posts.next(formatPostModel(response?.data));
      },
      error: err => {
        console.log(err);
      }
    });
  }
}


export function formatPostModel(data: any[]): PostModel[] {
  let result: PostModel[] = [];
  if (data) {
    data.forEach(item => {
      let category: CategoryModel = new CategoryModel();
      category.name = item.categoryDetails[0]?.name;
      category.categoryId = item.categoryDetails[0]?._id;
      let user: UserModel = new UserModel();
      user.userId = item.authorDetails[0]?._id;
      user.firstName = item.authorDetails[0]?.firstName;
      user.lastName = item.authorDetails[0]?.lastName;
      let post: PostModel = new PostModel();
      post.postId = item._id;
      post.title = item.title;
      post.categoryDetails = category;
      post.authorDetails = user;
      post.addedOn = new Date(item.addedOn);
      post.body = item.body;
      post.readingTime = item.readingTime;
      result.push(post);
    });
  }
  return result;
}
