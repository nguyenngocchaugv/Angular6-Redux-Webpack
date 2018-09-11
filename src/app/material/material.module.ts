import { NgModule } from '@angular/core';

import {
    MatCardModule,
    MatButtonModule,
    MatSidenavModule
} from '@angular/material';

const MATERIALS = [
    MatCardModule,
    MatButtonModule,
    MatSidenavModule
];

@NgModule({
    exports: MATERIALS,
    imports: MATERIALS
})
export class CustomMaterialModule { }