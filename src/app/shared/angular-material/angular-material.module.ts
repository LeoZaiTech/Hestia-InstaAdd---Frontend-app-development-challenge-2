import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

const ANGULAR_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatTableModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatMenuModule,
  MatTableModule,
  MatRadioModule,
  MatExpansionModule,
  MatDialogModule,
  MatSliderModule,
  MatTabsModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ANGULAR_MATERIAL_MODULES],
  exports: ANGULAR_MATERIAL_MODULES,
})
export class AngularMaterialModule {}
