import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Category} from '../../model/Category';
import {CategoryService} from '../../service/category.service';
import {MatSelectChange} from '@angular/material/select';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  loading = false;
  categories: Category[];
  selectedCategory: Category;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      details: this.formBuilder.array([])
    });

    this.categoryService.getCategories().subscribe( categories => this.categories = categories);
  }

  get f() { return this.productForm.controls; }

  get details() { return this.productForm.get('details') as FormArray; }

  onSelectChange(event: MatSelectChange) {
    this.details.clear();
    this.selectedCategory = this.categories.find(cat => cat.id === event.value.id);
    this.selectedCategory.features.forEach(feature => {
      this.details.push(this.addDetail(feature.id, feature.name));
    });
  }

  addDetail(featureId: number, name: string) {
    return this.formBuilder.group({
      feature: this.formBuilder.group({
        id: [featureId]
      }),
      name: [name],
      value: ['']
    });
  }

  onSubmit() {
    this.loading = true;

    if (this.productForm.invalid) {
      return;
    }

    this.productService.addProduct(this.productForm.value)
      .subscribe(() => this.router.navigate(['/login']));
  }

}
