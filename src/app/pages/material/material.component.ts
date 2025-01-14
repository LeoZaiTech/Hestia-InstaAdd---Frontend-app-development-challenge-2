import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'CODE0015211', name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 'CODE0015212', name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 'CODE0015213', name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 'CODE0015214', name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 'CODE0015215', name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 'CODE0015216', name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 'CODE0015217', name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 'CODE0015218', name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 'CODE0015219', name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 'CODE0015210', name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
})
export class MaterialComponent {
  @ViewChild('autocompleteInput') autocompleteInput?: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: string[];

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  filter(): void {
    if (this.autocompleteInput) {
      const filterValue = this.autocompleteInput.nativeElement.value.toLowerCase();
      this.filteredOptions = this.options.filter((o) => o.toLowerCase().includes(filterValue));
    }
  }
}
