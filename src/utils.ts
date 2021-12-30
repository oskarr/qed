/**
 * Shuffles array **in place**.
 * Modified version of: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.
 */
export function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  let j;
  let x;

  for (let i = a.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = b[i];
    b[i] = b[j];
    b[j] = x;
  }
  return b;
}

/**
 * From the given string s, replace f with r of nth occurrence
 * https://stackoverflow.com/questions/35499498/replace-nth-occurrence-of-string
 */
export function replaceNth(s: string, f: string, r: string, n: number): string {
  return s.replace(RegExp(`^(?:.*?${f}){${n}}`), (x) => x.replace(RegExp(`${f}$`), r));
}

/**
 * Create an exclusive range (Python-like), as a list.
 * https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
 */
export function range(start: number, end: number): number[] {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}

/**
 * State for the swipe indicator. None means hidden, left means that the
 * left SwipeIndicator is shown (user dragged finger to the right).
 * A prefix of x means that the SwipeIndicator is shown,
 * but grayed-out with a "no entry" sign showing.
 */
export type SwipeIndicatorState = 'xleft' | 'left' | 'none' | 'right' | 'xright'

/**
 * A dictionary used to convert a SwipeIndicatorState to an index offset.
 * Maps right -> 1, left -> -1, other -> 0
 */
export const swipeIndicatorToOffset: { [key: string]: -1 | 0 | 1 } = {
  right: 1, left: -1, none: 0, xleft: 0, xright: 0,
};

/**
 * Accepts a TouchEvent (or MouseEvent if in development mode),
 * and returns the clientX & clientY coordinates for the event.
 * If the event is of a non-allowed type, returns [undefined, undefined].
 * @param e TouchEvent (or MouseEvent in development mode)
 * @returns A list on the form [x, y] with event coordinates,
 * or [undefind, undefined] if unsuccessful.
 */
export function getCoordsFromEvent(e: Event): [number, number] | [undefined, undefined] {
  if (e.constructor.name === 'TouchEvent') {
    const evt = e as TouchEvent;
    const touch = evt.touches[0];
    return (evt.touches.length === 1) ? [touch.clientX, touch.clientY] : [undefined, undefined];
  } if (process.env.NODE_ENV === 'development' && e.constructor.name === 'MouseEvent') {
    // We only accept MouseEvents as swipe events in development mode.
    const evt = e as MouseEvent;
    return [evt.clientX, evt.clientY];
  }
  return [undefined, undefined];
}
