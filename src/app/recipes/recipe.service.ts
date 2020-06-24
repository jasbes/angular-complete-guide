import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    constructor(private slService: ShoppingListService) { }

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.notifyChanges()
    }

    getRecipes() {
        return [...this.recipes];
    }

    sendToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getById(id: number) {
        return { ...this.recipes[id] };
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.notifyChanges()
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.notifyChanges();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.notifyChanges();
    }

    private notifyChanges() {
        this.recipesChanged.next(this.getRecipes());
    }
}