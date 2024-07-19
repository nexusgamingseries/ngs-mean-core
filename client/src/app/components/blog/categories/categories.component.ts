import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone:true,
  imports:[
    CommonModule,

  ]
})
export class BlogCategoriesComponent implements OnInit {

  constructor( private WP:WordpressService) { }
  categories: any[]
  selectedCat:string = 'all';

  @Output() currentCategory = new EventEmitter();


  ngOnInit() {

    this.WP.getCategories().subscribe(
      (res: any[])=>{
        this.categories = res;
      }
    )

  }
  selectCategory(cat) {
    this.selectedCat = cat;
    //emit selected cat
    this.currentCategory.emit(cat);
  }

}
