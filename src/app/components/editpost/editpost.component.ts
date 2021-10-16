import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CustomEditor from '../../../assets/ckeditor/build/ckeditor';
import { DDLModel, PostModel } from 'src/app/common/models';
import { CommonService } from 'src/app/services/common.service';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  public Editor = CustomEditor;
  public config = {
    placeholder: 'Create you story here...',
    simpleUpload: {
      uploadUrl: 'https://meanblogapi.herokuapp.com/post/ckupload'
    }
  }
  categories: DDLModel[] = [];
  postForm: FormGroup;

  constructor(
    private http: HttpService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.commonService.setLoding(true)
    this.http.get('/categories').subscribe({
      next: response => {
        this.categories = response?.data?.map(r => new DDLModel(r._id, r.name));
      },
      error: err => {
        this.commonService.showError();
      }
    }).add(() => this.commonService.setLoding(false));
  }

  createForm(): void {
    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      readingTime: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      disableComments: new FormControl(false),
      isFeatured: new FormControl(false)
    });
  }

  createPost(): void {
    if (this.postForm.valid) {
      this.commonService.setLoding(true);
      let postModel: PostModel = new PostModel();
      postModel.authorId = this.cookieService.getUserdataFromCookies().userId;
      postModel.body = this.postForm.get('body').value;
      postModel.bodyText = this.postForm.get('body').value?.replace(/<(.|\n)*?>/g, ' ');
      postModel.title = this.postForm.get('title').value;
      postModel.categoryId = this.postForm.get('categoryId').value;
      postModel.readingTime = this.postForm.get('readingTime').value;
      postModel.disableComments = this.postForm.get('disableComments').value ?? false;
      postModel.isFeatured = this.postForm.get('isFeatured').value ?? false
      this.http.post('/post/create', postModel).subscribe({
        next: data => {
          if (data) {
            this.router.navigateByUrl(`/view-post?id=${data._id}`);
          }
        },
        error: err => {
          this.commonService.showError();
        }
      }).add(() => this.commonService.setLoding(false));
    }
    else {
      this.postForm.markAllAsTouched();
    }
  }

}
