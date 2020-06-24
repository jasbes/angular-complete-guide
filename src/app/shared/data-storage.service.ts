import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class DataStorajeService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    storeData() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://angular-complete-guide-c6125.firebaseio.com/recipes.json', recipes)
            .subscribe(response => console.log(response));
    }

    fetchData() {
        return this.http.get<Recipe[]>('https://angular-complete-guide-c6125.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }),
                tap(recipes => this.recipeService.setRecipes(recipes)));

    }
}