import { Component, OnInit } from '@angular/core';
// import { BookstoreService } from 'src/app/services/productstore.service';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {
  images;
  public imagePath;
  imgURL: any;
  // constructor(private bookStore: BookstoreService) { }

  ngOnInit() {
  }
  // selectImage(files) {
  //   if (files.length > 0) {
  //     const file = files[0];
  //     this.images = file;
  //   }
  //   console.log(this.images);
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //     console.log(this.imgURL);
  //   }
  // }
  // addAuthor(f) {
  //   const formData = new FormData();
  //   formData.append('file', this.images);
  //   console.log(f.value);
  //   for (const key in f.value) {
  //     formData.append(key, f.value[key]);
  //   }
  //   this.bookStore.addAuthor(formData);
  // }

}
