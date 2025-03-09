import { useEffect, useRef } from "react";

export const useDidEffect = (effect: React.EffectCallback, deps: React.DependencyList) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      effect();
    } else {
      didMountRef.current = true;
    }
  }, deps);
};
