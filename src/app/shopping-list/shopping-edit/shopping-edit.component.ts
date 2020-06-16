import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput')
  nameInput: ElementRef;

  @ViewChild('amountInput')
  amountInput: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient() {
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = this.amountInput.nativeElement.value;
    this.slService.addIngredient(new Ingredient(ingName, ingAmount));
  }

}
