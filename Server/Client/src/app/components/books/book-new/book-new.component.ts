// import { Component, OnInit } from '@angular/core';
// import { Product, Author, Genre, ProductstoreService } from 'src/app/services/productstore.service';
// import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';

// @Component({
//   selector: 'app-book-new',
//   templateUrl: './book-new.component.html',
//   styleUrls: ['./book-new.component.css']
// })
// export class BookNewComponent implements OnInit {
//   book: Product;
//   priceCategories: Author[];
//   genres: Genre[];
//   images;
//   bookForm: FormGroup;
//   constructor(private bookStore: ProductstoreService) {
//     this.bookForm = new FormGroup({
//       name: new FormControl('', Validators.required),
//       price: new FormControl('', Validators.required),
//       priceCategory: new FormControl('', Validators.required),
//       Image: new FormControl('', Validators.required),

//       productCategoryArray: new FormArray([new FormGroup({
//         id: new FormControl('')
//       })]),
//     });

//   }
//   get productCategArray(): FormArray {
//     return this.bookForm.get('productCategoryArray') as FormArray;
//   }
//   newGenre(): FormGroup {
//     return new FormGroup({
//       id: new FormControl(''),
//     });
//   }
//   addGenres() {
//     this.productCategArray.push(this.newGenre());
//   }
//   removeGenre(i) {
//     this.productCategArray.removeAt(i);
//   }
//   ngOnInit() {
//     this.bookStore.getAuthors().subscribe(autho => {
//       this.priceCategories = autho;
//     });
//     this.bookStore.getGenres().subscribe(genres => {
//       this.genres = genres;
//       console.log(this.genres);
//     });

//   }
//   selectImage(event){
//     if(event.target.files.length>0){
//       const file=event.target.files[0];
//       this.images=file;
//     }
//   }
//   AddBook() {
//     const formData=new FormData();
//     formData.append('file',this.images);
//     let productCategories = [];
//     for (const key of this.productCategArray.value) {
//       productCategories.push(key['id']);
//     }
//     const newBook = { ...this.bookForm.value, productCategory: productCategories };
//     delete newBook.productCategoryArray;
//     delete newBook.Image;
//     // delete newBook.productCategory;
//     console.log(newBook);
//     for(const key in newBook){
//         formData.append(key,newBook[key]);
//     }
//     if(productCategories.length!=0){
//     const podString= JSON.stringify(productCategories);
//     formData.append("productCategory",podString);
//     }
    
//     this.bookStore.addProduct(formData);
//   }
//   discardgenre(e){

//   }
  

// }
