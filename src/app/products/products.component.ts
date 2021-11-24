import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('image') imageTemplate!: TemplateRef<any>;
  @ViewChild('size') sizeTemplate!: TemplateRef<any>;
  public productList!: MatTableDataSource<Product>;
  public columnList: { name: string, sorted?: boolean, template?: TemplateRef<any> }[] = [
    {
      name: 'name',
      sorted: true,
    },
    {
      name: 'image',
      template: this.imageTemplate
    },
    {
      name: 'category',
      sorted: true,
    },
    {
      name: 'sizes',
      sorted: true,
      template: this.sizeTemplate
    }
  ];

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.reload();
  }

  ngAfterViewInit(): void {
    this.columnList.forEach(item => {
      if (item.name === 'sizes') {
        item.template = this.sizeTemplate
      } else if (item.name === 'image') {
        item.template = this.imageTemplate
      }
    })
    this.cd.detectChanges();
  }


  // Reload
  public reload() {
    this.productService.getAll().subscribe(products => {
      this.productList = new MatTableDataSource<Product>(products);
    });
  }

  // Delete product
  public deleteProduct(id: string) {
    this.productService.delete(id).subscribe(() => {
      this.productList.data = this.productList.data.filter(product => product.id !== id)
    });
  }

}
