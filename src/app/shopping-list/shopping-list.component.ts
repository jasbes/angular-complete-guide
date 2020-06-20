import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];

  ingredientSubscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();

    this.ingredientSubscription = this.slService.onIngredientsChanged()
    .subscribe(newIngredients => {
      this.ingredients = newIngredients;
    });
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onIngredientClick(index: number){
    this.slService.startedEditing.next(index);
  }

}
