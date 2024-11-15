import { useEffect, useMemo, useRef, useState } from "react";

// https://marmelab.com/blog/2023/01/11/use-async-effect-react.html

/**
 * Hook to run an async effect on mount and another on unmount.
 */
export function useAsyncEffect<T>(
  mountCallback: () => Promise<T>,
  unmountCallback?: () => Promise<T>,
  deps: unknown[] = []
): UseAsyncEffectResult {
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);
  const [result, setResult] = useState<unknown>();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    let mountSucceeded = false;

    (async () => {
      await Promise.resolve(); // wait for the initial cleanup in Strict mode - avoids double mutation
      if (!isMounted.current || ignore) {
        return;
      }
      setIsLoading(true);
      try {
        const result = await mountCallback();
        mountSucceeded = true;
        if (isMounted.current && !ignore) {
          setError(undefined);
          setResult(result);
          setIsLoading(false);
        } else {
          // Component was unmounted before the mount callback returned, cancel it
          unmountCallback?.();
        }
      } catch (error) {
        if (!isMounted.current) return;
        setError(error);
        setIsLoading(false);
      }
    })();

    return () => {
      ignore = true;
      if (mountSucceeded && !!unmountCallback) {
        unmountCallback()
          .then(() => {
            if (!isMounted.current) return;
            setResult(undefined);
          })
          .catch((error: Error) => {
            if (!isMounted.current) return;
            setError(error);
          });
      }
    };
  }, deps);

  return useMemo(
    () => ({ result, error, isLoading }),
    [result, error, isLoading]
  );
}

export interface UseAsyncEffectResult {
  result: unknown;
  error: unknown;
  isLoading: boolean;
}
