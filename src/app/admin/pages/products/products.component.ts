import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { Size } from '../../models/size';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('image', { static: true }) imageTemplate!: TemplateRef<any>;
  @ViewChild('size', { static: true }) sizeTemplate!: TemplateRef<any>;
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

  public categoryList: Category[] = [];
  public sizeList: Size[] = [];
  public emptyData: Product = {
    name: '',
    category: 'Coffee',
    sizes: [{
      name: 'S', price: 0
    }], description: ''
  }

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private sizeService: SizeService) { }

  ngOnInit(): void {
    this.reload();
    this.columnList.forEach(item => {
      if (item.name === 'sizes') {
        item.template = this.sizeTemplate
      } else if (item.name === 'image') {
        item.template = this.imageTemplate
      }
    });
    this.getCategoryList();
    this.getSizeList();
  }

  /**
   * @return {void} 
   * @description Reload product list
   */
  public reload(): void {
    this.productService.getAll().subscribe(products => {
      this.productList = new MatTableDataSource<Product>(products);
    });
  }

  /**
   * @returns {void}
   * @description Get category list
   */
  public getCategoryList(): void {
    this.categoryService.getAll().subscribe(categoryList => {
      this.categoryList = categoryList;
    })
  }

  /**
   * @returns {void}
   * @description Get size list
   */
  public getSizeList(): void {
    this.sizeService.getAll().subscribe(sizeList => {
      this.sizeList = sizeList;
    })
  }

  /**
   * 
   * @param {action: string, data: Product} event 
   * @returns {void}
   * @description Open dialog with 2 action create, update
   */
  public openDialog(event: { action: string, data?: Product }): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        action: event.action,
        data: event.data || this.emptyData,
        categoryList: this.categoryList,
        sizeList: this.sizeList,
      }
    })
    dialogRef.afterClosed().subscribe((result: { data: Product }) => {
      if (result.data) {
        switch (event.action) {
          case 'create': {
            this.createProduct(result.data);
            break;
          }
          case 'update': {
            this.updateProduct(result.data);
            break;
          }
          default: {
            break;
          }
        }
      }
    })
  }

  /**
   * @param {Product} data
   * @returns {void}
   * @description Create product 
   */
  private createProduct(data: Product): void {
    this.productService.create(data).subscribe(() => {
      this.reload();
    })
  }

  /**
   * @param {Product} data
   * @returns {void}
   * @description Update product
   */
  private updateProduct(data: Product): void {
    if (data.id) {
      this.productService.update(data.id, data).subscribe(() => {
        const index = this.productList.data.findIndex(product => product.id === data.id);
        this.productList.data[index] = JSON.parse(JSON.stringify(data));
        this.productList.data = [... this.productList.data];
      })
    }
  }

  /**
   * 
   * @param {string} id 
   * @returns {void}
   * @description Delete product
   */
  public deleteProduct(id: string): void {
    this.productService.delete(id).subscribe(() => {
      this.productList.data = this.productList.data.filter(product => product.id !== id)
    });
  }

}
