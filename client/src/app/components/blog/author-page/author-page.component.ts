import { Component, OnInit } from '@angular/core';
import { BlogCommonService } from 'src/app/services/blog-common.service';
import { ActivatedRoute } from '@angular/router';
import { MarkdownParserService } from 'src/app/services/markdown-parser.service';
import { WordpressService } from 'src/app/services/wordpress.service';
import { Author } from 'src/app/services/wordpress.service';
import { BannerImageComponent } from '../../banner-image/banner-image.component';
import { BlogHeadlineComponent } from '../blog-headline/blog-headline.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    BannerImageComponent,
    BlogHeadlineComponent,

  ]
})
export class AuthorPageComponent implements OnInit {

  recId;
  authorInf:Author;
  posts = [];

  constructor(private route: ActivatedRoute, public md: MarkdownParserService, public blogCommon: BlogCommonService, private WP:WordpressService) {
    //gets the ID from the url route
    if (this.route.snapshot.params['id']) {
      this.recId = this.route.snapshot.params['id'];
    }

    this.route.data.subscribe(
      res => {
        if (res.blogId) {
          this.recId = res.blogId;
        }
      }
    )
   }

  ngOnInit() {
    this.authorInf = new Author();
    this.WP.getCacheAuthor(this.recId).subscribe(
      (auth:Author)=>{
        this.authorInf = auth;
        this.WP.getBlogPosts([{ author: this.recId }, { 'filter[orderby]': 'date' }, { 'order': 'desc' }]).subscribe(
          posts=>{
            this.posts = posts.posts;
          }
        )
      }
    )

    console.log("this.authorInf", this.authorInf);

    }
  }
