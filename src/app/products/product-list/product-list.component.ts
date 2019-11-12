import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  // since displayCode is a local variable its change is lost as we move away from this component.
  // so we will retain the value in the store
  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService, private store: Store<any>) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => this.errorMessage = err.error
    });

    this.store.pipe(select('products')).subscribe(
      // entire product slice from store is received
      products => {
        if (products) {
          this.displayCode = products.showProductCode;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Each time the user clicks the checkbox the action is dispatched, the reducer is executed and the exisiting store state is updated with new one
  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value,
    })
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
