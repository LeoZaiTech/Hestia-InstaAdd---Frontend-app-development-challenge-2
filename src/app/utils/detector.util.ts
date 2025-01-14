import { SimpleChange } from '@angular/core';

/**
 * return true when change is detected
 * @param change simple change instance
 */
export function changeDetected(change: SimpleChange): boolean {
  if (change) {
    return change.previousValue !== change.currentValue;
  }

  return false;
}

/**
 * return window inner width
 */
export function detectScreenWidth(): number {
  let width = 0;

  if (window) {
    width = window.innerWidth;
  }

  return width;
}
