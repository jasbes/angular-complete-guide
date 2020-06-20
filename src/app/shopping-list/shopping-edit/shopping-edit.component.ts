import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm')
  ingredientForm: NgForm;
  isEditMode = false;
  editIndex: number;

  private editSubscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.slService.startedEditing
      .subscribe(index => {
        this.isEditMode = true;
        this.editIndex = index;

        let ingredient = this.slService.getById(index);
        this.ingredientForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        })
      });
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    let newIngredient = new Ingredient(ingName, ingAmount);

    if (this.isEditMode) {
      this.slService.updateIngredient(this.editIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.clearForm();
  }

  onDelete() {
    this.slService.deleteByIndex(this.editIndex);
    this.clearForm();
  }

  clearForm() {
    this.isEditMode = false;
    this.ingredientForm.reset();
  }

}
