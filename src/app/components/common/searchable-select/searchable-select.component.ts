import { Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';
import { FilteredOption } from 'src/app/models/components/filtered-option';
import { Vendor } from 'src/app/models/apis/vendor';

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [ReactiveFormsModule, IconsModule],
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.scss',
})
export class SearchableSelectComponent {
  @ViewChild('selectOptionPanel') selectPanelRef!: ElementRef;
  @ViewChild('inputEl') inputElRef!: ElementRef;

  inputControl = input.required<FormControl<string | null>>();
  label = input(''); // Label text for the select
  placeholder = input('Search and select'); // Placeholder text for the input
  options = input<Vendor[]>([]); // Array of options to search from
  isSearching = input<boolean>(false); // Flag to indicate searching state

  selected = output<Vendor>(); // Event emitted when an option is selected
  inputBlur = output(); // Event emitted when the input is blur

  filteredOptions: FilteredOption<Vendor>[] = [];
  isFocus = false;

  selectedOptionIndex = -1; // To track the currently selected option on the keyboard

  constructor() {
    effect(() => {
      if (this.options().length > 0) {
        this.filter(this.inputControl().value);
      }
    });

    effect((onCleanup) => {
      const subscription = this.inputControl().valueChanges.subscribe((value) => {
        this.filter(value);
      });

      onCleanup(() => {
        subscription.unsubscribe();
      });
    });
  }

  filter(value: string | null): void {
    const filterValue = value?.trim().toLowerCase();
    if (filterValue) {
      this.filteredOptions = this.options()
        .filter((o) => o.name?.toLowerCase().includes(filterValue))
        .map((o) => {
          const startIndex = o.name!.toLowerCase().indexOf(filterValue);
          const strLength = filterValue.length;
          return {
            label: [
              {
                index: 0,
                text: o.name!.slice(0, startIndex),
                isHighlight: false,
              },
              {
                // Matching item
                index: 1,
                text: o.name!.slice(startIndex, startIndex + strLength),
                isHighlight: true,
              },
              {
                index: 2,
                text: o.name!.slice(startIndex + strLength),
                isHighlight: false,
              },
            ],
            data: o,
          };
        });
    } else {
      this.filteredOptions = this.options().map((o) => {
        return {
          label: [
            {
              index: 0,
              text: o.name!,
              isHighlight: false,
            },
          ],
          data: o,
        };
      });
    }
  }

  onInputBlur() {
    this.isFocus = false;
    this.selectedOptionIndex = -1; // Reset index on blur
    this.inputBlur.emit();
  }

  onSelect(option: Vendor): void {
    this.selected.emit(option);
  }

  onInputKeydown(event: KeyboardEvent) {
    if (!this.isFocus || this.filteredOptions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      // Navigate down the list
      this.selectedOptionIndex = Math.min(
        this.selectedOptionIndex + 1,
        this.filteredOptions.length - 1
      );
      this.scrollToSelectedOption();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      // Navigate up the list
      this.selectedOptionIndex = Math.max(this.selectedOptionIndex - 1, 0);
      this.scrollToSelectedOption();
    } else if (event.key === 'Enter' && this.selectedOptionIndex >= 0) {
      // Select the highlighted option
      this.onSelect(this.filteredOptions[this.selectedOptionIndex].data);
      this.inputElRef?.nativeElement.blur();
    }
  }

  private scrollToSelectedOption() {
    const panelElement = this.selectPanelRef.nativeElement;
    const selectedOptionElement =
      panelElement.querySelectorAll('.select-option')[this.selectedOptionIndex];

    if (selectedOptionElement) {
      const optionRect = selectedOptionElement.getBoundingClientRect();
      const panelRect = panelElement.getBoundingClientRect();

      if (optionRect.bottom > panelRect.bottom) {
        // Scroll down to the selected option
        panelElement.scrollTop += optionRect.bottom - panelRect.bottom;
      } else if (optionRect.top < panelRect.top) {
        // Scroll up to the selected option
        panelElement.scrollTop -= panelRect.top - optionRect.top;
      }
    }
  }
}
