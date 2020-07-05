import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recipes'
    },
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})],
    providers: [],
    exports: [RouterModule]
})
export class AppRouteModule {

}