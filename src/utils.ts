/**
 * Shuffles array in place.
 * Modified version of: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.
 */
// eslint-disable-next-line import/prefer-default-export
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
