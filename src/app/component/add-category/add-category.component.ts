import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      features: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', [Validators.required]]
        })
      ])
    });
  }

  get f() { return this.categoryForm.controls; }

  get features() { return this.categoryForm.get('features') as FormArray; }

  addFeature() {
    this.features.push(this.formBuilder.group({
      name: ['', [Validators.required]]
    }));
    this.features.updateValueAndValidity();
  }

  removeFeature() {
    this.features.removeAt(this.features.controls.length - 1);
    this.features.updateValueAndValidity();
  }

  onSubmit() {
    this.loading = true;

    if (this.categoryForm.invalid) {
      return;
    }

    this.categoryService.addCategory(this.categoryForm.value)
      .subscribe(() => this.router.navigate(['/login']));
  }
}
