import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    private ingredientsChanged = new Subject<Ingredient[]>();

    startedEditing = new Subject<number>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return [...this.ingredients];
    }

    getById(id: number) {
        return { ...this.ingredients[id] };
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.notifyChange();
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.notifyChange();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.notifyChange();
    }

    deleteByIndex(index: number) {
        this.ingredients.splice(index, 1);
        this.notifyChange();
    }

    onIngredientsChanged() {
        return this.ingredientsChanged.asObservable();
    }

    private notifyChange() {
        this.ingredientsChanged.next([...this.ingredients]);
    }
}