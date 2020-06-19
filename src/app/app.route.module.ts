import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const ROUTES: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recipes'
    },
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent
            }
        ]
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(ROUTES)],
    providers: [],
    exports: [RouterModule]
})
export class AppRouteModule {

}