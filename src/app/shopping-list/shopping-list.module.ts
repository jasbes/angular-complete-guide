import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

const components = [
    ShoppingListComponent,
    ShoppingEditComponent,
];

const modules = [
    RouterModule,
    ShoppingListRoutingModule,
    SharedModule
];

@NgModule({
    imports: [...modules],
    declarations: [...components]
})
export class ShoppingListModule {

}