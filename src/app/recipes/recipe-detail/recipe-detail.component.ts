import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  @Input()
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this.route.snapshot['id'];
    this.recipe = this.recipeService.getById(id);
    this.route.params['id'].subscribe(id => {
      this.recipe = this.recipeService.getById(id);
    })
  }

  sendToShoppingList() {
    this.recipeService.sendToShoppingList(this.recipe.ingredients);
  }

}
