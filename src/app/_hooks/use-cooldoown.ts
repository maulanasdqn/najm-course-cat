import { useEffect, useState } from "react";

export const useCooldown = () => {
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCooldown(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return cooldown;
};
