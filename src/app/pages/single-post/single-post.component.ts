import { PostService } from './../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postData: any;
  similarPosts: Array<object>;
  constructor(
    private route: ActivatedRoute,

    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log(val.id);
      this.postService.countViews(val.id);
      this.postService.loadOnePost(val.id).then((doc) => {
        console.log(doc);
        this.postData = doc;
        this.loadSimilarPost(this.postData.category.categoryId);
      });
    });
  }

  loadSimilarPost(catId) {
    this.postService.loadSimilar(catId).subscribe((val) => {
      this.similarPosts = val;
    });
  }
}
