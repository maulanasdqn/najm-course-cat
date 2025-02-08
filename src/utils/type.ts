/**
 * Checks if all properties in object `a` are equal to those in object `b`.
 *
 * @param a - The first object.
 * @param b - The second object.
 * @returns `true` if all properties match, otherwise `false`.
 */
export const everyEqual = (a: Record<string, unknown>, b: Record<string, unknown>) => {
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};

/**
 * Checks if two arrays have any common elements.
 *
 * @template T - The type of elements in the arrays.
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @returns `true` if there are common elements between the two arrays, otherwise `false`.
 *
 * @example
 * **Example 1 (Positive result):**
 * ```typescript
 * hasCommonElements([1, 2], [3, 4, 1]);
 * // `true`, because both arrays contain the element 1
 * ```
 *
 * **Example 2 (Negative result):**
 * ```typescript
 * hasCommonElements([1, 2], [3, 4]); //
 * // `false`, because there are no common elements
 * ```
 */
export function hasCommonElements<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] = arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer?.some((element) => set.has(element));
}

/**
 * Checks if a given value is an object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an object, otherwise `false`.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
