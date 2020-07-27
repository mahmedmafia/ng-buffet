import { Component, OnInit } from '@angular/core';
import { Product, Author, Category, ProductstoreService, priceCategory } from 'src/app/services/productstore.service';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  book: Product;
  priceCategories: priceCategory[];
  categories: Category[];
  images;
  productForm: FormGroup;
  constructor(private productStore: ProductstoreService) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity_in_inventory: new FormControl('', Validators.required),
      priceCategory: new FormControl('', Validators.required),
      Image: new FormControl('', Validators.required),

      productCategoryArray: new FormArray([new FormGroup({
        id: new FormControl('')
      })]),
    });

  }
  get productCategArray(): FormArray {
    return this.productForm.get('productCategoryArray') as FormArray;
  }
  newCategory(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
    });
  }
  addCategorys() {
    this.productCategArray.push(this.newCategory());
  }
  removeCategory(i) {
    this.productCategArray.removeAt(i);
  }
  ngOnInit() {
    this.productStore.getPriceCategories().subscribe(priceCateg => {
      this.priceCategories = priceCateg;
    });
    this.productStore.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });

  }
  selectImage(event){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.images=file;
    }
  }
  AddProduct() {
    const formData=new FormData();
    formData.append('file',this.images);
    let productCategories = [];
    for (const key of this.productCategArray.value) {
      productCategories.push(key['id']);
    }
   productCategories= productCategories.filter((v, i, a) => a.indexOf(v) === i);
    const newProduct = { ...this.productForm.value, productCategory: productCategories };
    delete newProduct.productCategoryArray;
    delete newProduct.Image;
    // delete newProduct.productCategory;
    console.log(newProduct);
    for(const key in newProduct){
        formData.append(key,newProduct[key]);
    }
    if(productCategories.length!=0){
    const podString= JSON.stringify(productCategories);
    formData.append("productCategory",podString);
    }
    
    this.productStore.addProduct(formData);
  }
  discardgenre(e){

  }
  
}
