import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadSpinerComponent } from './load-spiner/load-spiner.component';
import { FormsModule } from '@angular/forms';

const components = [
    AlertComponent,
    LoadSpinerComponent,
    DropdownDirective
];

const modules = [
    CommonModule,
    FormsModule
];

@NgModule({
    imports: [...modules],
    declarations: [...components],
    exports: [...components, ...modules]
})
export class SharedModule {

}