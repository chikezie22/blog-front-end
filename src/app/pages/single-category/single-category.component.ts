import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  postArray: Array<any>;
  categoryObj: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.categoryObj = val;
      this.postService.loadCategoryPosts(val.id).subscribe((val) => {
        this.postArray = val;
        console.log(this.postArray);
      });
    });
  }
}
