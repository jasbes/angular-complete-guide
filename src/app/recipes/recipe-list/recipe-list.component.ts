import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'Just a test', 'https://cdn.pixabay.com/photo/2017/11/16/18/51/kagyana-2955466_1280.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
