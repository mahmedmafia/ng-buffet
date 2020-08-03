import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductstoreService {
  // BaseUrl = 'http://127.0.0.1:3000/';
  BaseUrl='';
  ProductsUrl = this.BaseUrl + 'products';
  priceCategoryUrl = this.BaseUrl + 'priceCategory';
  productCategoryUrl = this.BaseUrl + 'productCategory';
  ProductsChanged = new Subject<Product[]>();
  constructor(private http: HttpClient) { }
  mapProduct(doc): Product {
    const LocalHostUrl = "http://localhost:3000/";
    let Image;
    if (!doc.Image) {
      Image = null;
    } else {
      Image = LocalHostUrl + doc.Image;
    }
    return {
      name:doc.name,
      priceCategory:doc.priceCategory,
      id: doc._id,
      category: doc.productCategory,
      Image: Image,
      price:doc.price,
      quantity:doc.quantity_in_inventory,
    };
  }
  mapAuthor(doc): Author {
    const LocalHostUrl = "http://localhost:3000/";
    let Image;
    if (!doc.Image) {
      Image = null;
    } else {
      Image = LocalHostUrl + doc.Image;
    }
    return {

      id: doc._id,
      Products: doc.Products,
      first_name: doc.first_name,
      last_name: doc.last_name,
      date_of_birth: doc.date_of_birth,
      date_of_death: doc.date_of_death,
      name:doc.name,
      Image: Image,
    };
  }
  mapAuthors(docs) {
    console.log(docs);
    return docs.map(doc => {
      const LocalHostUrl = "http://localhost:3000/";
      let Image;
      if (!doc.Image) {
        Image = null;
      } else {
        Image = LocalHostUrl + doc.Image;
      }
      return {

        id: doc._id,
        Products: doc.Products,
        name:doc.name,

      };
    });

  }
  mapProducts(docs): Product[] {
    return docs.map(doc => {
      const LocalHostUrl = "http://localhost:3000/";
      let Image;
      if (!doc.Image) {
        Image = null;
      } else {
        Image = LocalHostUrl + doc.Image;
      }
      return {

        name: doc.name,
        priceCategory: doc.priceCategory,
        id: doc._id,
        category: doc.productCategory,
        Image:Image,
        price: doc.price,
        quantity: doc.quantity_in_inventory,
      };
    });
  }

  getProducts(query = '') {

    this.http.get<Product[]>(this.ProductsUrl, { params: { title: query } })
      .pipe(map(docs => docs['products']), map(this.mapProducts)).subscribe(res => {
        this.ProductsChanged.next(res);
      });

  }
  serachProducts(query) {
    this.getProducts(query);
  }
  getProduct(id) {
    return this.http.get<Product>(this.ProductsUrl + '/' + id).pipe(map(doc => doc['doc']), map(this.mapProduct));
  }
  // getAuthor(id) {
  //   return this.http.get<Author>(this.AuthorsUrl + '/' + id)
  //     .pipe(map(docs => docs['docs']), map(this.mapAuthor));
  // }

  // getAuthors() {
  //   return this.http.get<priceCategory[]>(this.AuthorsUrl)
  //     .pipe(map(docs => docs['docs']), map(this.mapAuthors));

  // }
  getCategories() {
    return this.http.get<Category[]>(this.productCategoryUrl)
      .pipe(map(docs => docs['docs']), map(docs => {
        return docs.map(doc => {
          return {
            id: doc._id,
            name: doc.name
          };
        });

      }));
  }
  getPriceCategories() {
    return this.http.get<Category[]>(this.priceCategoryUrl)
      .pipe(map(docs => docs['docs']), map(docs => {
        return docs.map(doc => {
          return {
            id: doc._id,
            name: doc.name
          };
        });

      }));
  }
  addProduct(newProduct) {
    this.http.post(this.ProductsUrl, newProduct).subscribe(res => {
    });
  }
  deleteProduct(id) {
    return this.http.delete(this.ProductsUrl + '/' + id);
  }
  // addAuthor(newAuthor) {
  //   this.http.post(this.AuthorsUrl, newAuthor).subscribe(res => {
  //     console.log(res);
  //   }, (err) => {
  //     console.log(err.error.error.message);
  //   });
  // }
}

export interface Product {
  id: string;
  name: string;
  priceCategory: priceCategory;
  category?: Category[];
  Image?: string;
  price: number;
  quantity: number;
}
export interface Category {
  id: string;
  name: string;
}
export interface priceCategory {
  id: string;
  name: string;
}
export interface Author {
  id: string;
  date_of_birth?: Date;
  date_of_death?: Date;
  first_name: string;
  last_name: string;
  name: string;
  Products?: Product[];
  Image?: string;
}