/**
 * value to integer number
 * @param value value to format
 */

export function toInteger(value: string | number): number {
  if (typeof value === 'string') {
    return parseInt(value, undefined);
  } else {
    return value;
  }
}

/**
 * add prefixed zero to number
 * @param value value to format
 */
export function addZero(value: string | number): string {
  value = toInteger(value);

  return value < 10 ? `0${value}` : `${value}`;
}

/**
 * get initial from the string value
 * @param value value to get initial
 * @param length
 * length of initial<br/>
 * default is 1
 */
export function getInitial(value: string, length = 1): string {
  const split = (value || '').split(' ');
  let initial = '';

  for (let i = 0; i < length; i++) {
    initial += (split[i] || '')[0].toUpperCase();
  }

  return initial;
}

/**
 * transform to ordinal number
 * @param value value to transform
 */
export function toOrdinal(value: number | string): string {
  value = value + '';

  switch (value[value.length - 1]) {
    case '1': {
      return value + 'st';
    }

    case '2': {
      return value + 'nd';
    }

    case '3': {
      return value + 'rd';
    }

    default: {
      return value + 'th';
    }
  }
}
