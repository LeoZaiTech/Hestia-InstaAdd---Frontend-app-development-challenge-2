import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';

@Component({
  selector: 'app-searchable-input',
  standalone: true,
  imports: [ReactiveFormsModule, IconsModule],
  templateUrl: './searchable-input.component.html',
  styleUrl: './searchable-input.component.scss',
})
export class SearchableInputComponent {
  inputControl = input.required<FormControl<string | number | null>>();
  label = input('');
  inputType = input('text');
  placeholder = input('Enter');
  isLoading = input(false);
  checkingText = input('Checking…');
  resultType = input<'correct' | 'wrong' | null>(null);
  correctText = input('Correct');
  wrongText = input('Wrong');

  clear = output();
  eventEnter = output();

  isFocus = false;

  get hasInputText(): boolean {
    return !!this.inputControl().value;
  }

  clearInputText() {
    if (this.hasInputText) {
      this.inputControl().reset();
    }

    this.clear.emit();
  }
}
