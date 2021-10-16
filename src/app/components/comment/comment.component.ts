import { Component, Input, OnInit } from '@angular/core';
import { CommentModel, PostModel, UserModel } from 'src/app/common/models';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';
import * as CustomEditor from '../../../assets/ckeditor/build/ckeditor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() post: PostModel;
  isLoggedIn: boolean = false;
  commentForm: FormGroup;
  comments: CommentModel[] = [];
  user: UserModel;
  public Editor = CustomEditor;
  public config = {
    placeholder: 'Share your feedback...',
    toolbar: {
      items: [
        'bold', 'italic', '|',
        'bulletedList', 'numberedList', '|',
        'undo', 'redo'
      ]
    }
  }

  constructor(
    private http: HttpService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.createCommentForm();
    this.isLoggedIn = this.cookieService.checkLogin();
    this.getComments();
    this.cookieService.isLoggedIn$.subscribe(data => {
      this.isLoggedIn = data;
      this.user = this.cookieService.getUserdataFromCookies();
    });
  }

  getComments(): void {
    let apiData: any = {
      postId: this.post.postId
    };
    this.http.post('/post/fetch-comments', apiData).pipe(take(1)).subscribe({
      next: response => {
        if (response) {
          this.comments = response.map(r => {
            let comment: CommentModel = new CommentModel();
            comment.commentBody = r.commentBody;
            comment.userId = r.user;
            comment.postId = r.post;
            comment.userDetails = new UserModel();
            comment.userDetails.firstName = r.userDetails[0].firstName;
            comment.userDetails.lastName = r.userDetails[0].lastName;
            comment.userDetails.email = r.userDetails[0].email;
            comment.userDetails.userId = r.userDetails[0]._id;
            return comment;
          });
        }
      },
      error: err => {
        this.commonService.showError();
      }
    });
  }

  createCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      body: new FormControl('', [Validators.required])
    });
  }

  addComment(): void {
    if (this.commentForm.valid) {
      this.commonService.setLoding(true);
      let apiData: any = {
        commentBody: this.commentForm.get('body').value,
        user: this.user.userId,
        post: this.post.postId
      };
      this.http.post('/post/add-comment', apiData).subscribe({
        next: response => {
          this.getComments();
        },
        error: err => {
          this.commonService.showError();
        }
      }).add(() => this.commonService.setLoding(false));
    }
    else {
      this.commentForm.markAllAsTouched();
    }
  }

}
