import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';

const MODULES = [AngularMaterialModule];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: MODULES,
})
export class SharedModule {}
