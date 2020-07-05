import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recipes'
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