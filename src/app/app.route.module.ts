import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

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
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [RecipesResolverService]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipesResolverService]
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