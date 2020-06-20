import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    constructor(private slService: ShoppingListService) { }

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Burger with fries',
            'Best burger you can get',
            'http://valenews.com.br/wp-content/uploads/2019/12/FestivalBurguer-e-BeerShoppingJdOriente13122019.jpg',
            [
                new Ingredient('Bread', 2),
                new Ingredient('Meat', 1),
                new Ingredient('Tomato', 1),
                new Ingredient('Salad', 1),
                new Ingredient('Cheese', 1)
            ]
        ),
        new Recipe(
            'Spaghetti bolognese',
            'Best spaghetti from Italy',
            'https://www.errenskitchen.com/wp-content/uploads/2015/02/Quick-Easy-Spaghetti-Bolognese2-1.jpg',
            [
                new Ingredient('Pasta', 1),
                new Ingredient('Tomato souce', 1),
                new Ingredient('Meat', 1)
            ]
        )
    ];

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

    private notifyChanges() {
        this.recipesChanged.next(this.getRecipes());
    }
}