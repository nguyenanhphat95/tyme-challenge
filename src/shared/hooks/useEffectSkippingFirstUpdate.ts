import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * Similar to useEffect, but doesn't run the effect on the first update
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 */
export const useEffectSkippingFirstUpdate = (
  effect: EffectCallback,
  deps?: DependencyList
): void => {
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
    } else {
      return effect();
    }
  }, deps);
};
