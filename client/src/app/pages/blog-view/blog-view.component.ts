import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MarkdownParserService } from '../../services/markdown-parser.service';
import { BlogCommonService } from 'src/app/services/blog-common.service';
import { WordpressService, Author } from 'src/app/services/wordpress.service';
import { Post } from 'src/app/services/wordpress.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BannerImageComponent } from 'src/app/components/banner-image/banner-image.component';
import { ImageGetterComponent } from 'src/app/components/blog/image-getter/image-getter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.css"],
  encapsulation: ViewEncapsulation.None,
  standalone:true,
  imports:[
    RouterModule,
    CommonModule,
    BannerImageComponent,
    ImageGetterComponent,
  ]
})
export class BlogViewComponent implements OnInit {
  //component properties
  recId: string; //local property for a receieved blog ID
  displayBlog: Post; //local property to hold a fetched blog
  displayAuthor: Author;
  slug: string;
  sanatizedBlogContent;
  headerText = "NGS Blog";

  constructor(
    private route: ActivatedRoute,
    public md: MarkdownParserService,
    public blogCommon: BlogCommonService,
    private WP: WordpressService,
    public sanitizer: DomSanitizer
  ) {
    //gets the ID from the url route
    if (this.route.snapshot.params["id"]) {
      this.recId = this.route.snapshot.params["id"];
    }

    if (this.route.snapshot.params["headerText"]){
      this.headerText = this.route.snapshot.params["headerText"];
    }

      this.route.data.subscribe((res) => {
        if (res.blogId) {
          this.recId = res.blogId;
        }
        if (res.slug) {
          this.slug = res.slug;
        }
        if(res.headerText){
            this.headerText = res.headerText;
        }
      });
  }
  //sanitizer.bypassSecurityTrustHtml(displayBlog.content)
  ngOnInit() {
    //gets provided blog post from received id
    this.displayBlog = new Post();
    this.displayAuthor = new Author();
    if (this.recId) {
      this.WP.getBlogPosts([{ slug: this.recId }]).subscribe((res: any) => {
        this.displayBlog = res.posts[0];
        this.sanatizedBlogContent = this.sanitizer.bypassSecurityTrustHtml(this.displayBlog.content);
        this.WP.getCacheAuthor(this.displayBlog.author).subscribe(
          (auth: Author) => {
            this.displayAuthor = auth;
            console.log('this.displayAuthor',this.displayAuthor)
          }
        );
      });
    } else if (this.slug) {
      this.WP.getBlogPosts([{ slug: this.slug }]).subscribe((res: any) => {
        this.displayBlog = res.posts[0];
        this.sanatizedBlogContent = this.sanitizer.bypassSecurityTrustHtml(
          this.displayBlog.content
        );
        this.WP.getCacheAuthor(this.displayBlog.author).subscribe(
          (auth: Author) => {
            this.displayAuthor = auth;
          }
        );
      });
    }
  }
}
