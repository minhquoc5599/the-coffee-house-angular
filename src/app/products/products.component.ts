import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList!: MatTableDataSource<Product>;
  public columnList: { name: string, sorted?: boolean, checkbox?: boolean, template?: string }[] = [
    {
      name: 'select',
      checkbox: true
    },
    {
      name: 'name',
      sorted: true,
    },
    {
      name: 'image',
      template: 'image'
    },
    {
      name: 'category',
      sorted: true,
    },
    {
      name: 'sizes',
      sorted: true,
      template: 'size'
    },
    {
      name: 'action'
    }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.reload();
  }

  public reload() {
    this.productService.getAll().subscribe(products => {
      this.productList = new MatTableDataSource<Product>(products);
    });
  }

}
