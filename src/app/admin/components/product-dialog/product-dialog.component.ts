import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { Size } from '../../models/size';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, data: Product, categoryList: Category[], sizeList: Size[] },
    private formBuilder: FormBuilder) {
    let temp: any = {};
    Object.entries(this.data.data).forEach(([key, value]) => {
      if (typeof value !== 'object') {
        temp[key] = new FormControl(
          value || '', Validators.required
        )
      } else {
        temp[key] = new FormArray([
          ...value.map((r: any) => new FormGroup(
            Object.entries(r).reduce((acc: any, [k, v]) => {
              acc[k] = new FormControl(v || '', Validators.required);
              return acc;
            }, {})
          ))
        ]);
      }
    });
    this.form = this.formBuilder.group(temp);
  }

  ngOnInit(): void {
  }

  public get sizes(): FormArray {
    return this.form.get('sizes') as FormArray
  }

  /**
   * @returns {FormGroup}
   * @description Create size object with element name and price
   */
  private createAttributeFormGroup(): FormGroup {
    return new FormGroup({
      'name': new FormControl('S', Validators.required),
      'price': new FormControl('', Validators.required)
    })
  }

  /**
   * @returns {void}
   * @description Add attribute row
   */
  public addAttributeRow(): void {
    const sizes = this.form.get('sizes') as FormArray;
    sizes.push(this.createAttributeFormGroup());
  }

  /**
   * @returns{void}
   * @description Remove attribute row
   */
  public removeAttributeRow(idx: number): void {
    const sizes = this.form.get('sizes') as FormArray;
    if (sizes.length > 1) {
      sizes.removeAt(idx)
    }
  }

  /**
   * @returns {void}
   * @description Confirm dialog and send data to Products Component
   */
  public confirmDialog(): void {
    this.dialogRef.close({ data: this.form.value })
  }

}
