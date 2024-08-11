export function isDifferent(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return true;
  }

  for (let key of keys1) {
    if (
      typeof obj1[key] === "object" &&
      obj1[key] !== null &&
      typeof obj2[key] === "object" &&
      obj2[key] !== null
    ) {
      if (isDifferent(obj1[key], obj2[key])) {
        return true;
      }
    } else if (obj1[key] !== obj2[key]) {
      return true;
    }
  }

  return false;
}
