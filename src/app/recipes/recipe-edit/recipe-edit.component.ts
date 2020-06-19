import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  isEditMode = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isEditMode = !!params['id'];
      this.id = +params['id'];
    });
  }

}
