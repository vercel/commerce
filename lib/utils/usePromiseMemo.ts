import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dependenciesMatch from 'utils/dependenciesMatch';

const usePromiseMemo = <T, E = unknown>(
  promise: () => Promise<T>,
  nextDeps: unknown[]
): { results?: T; error?: E; loading: boolean; refetch: () => void } => {
  const [results, setResults] = useState<T>();
  const [error, setError] = useState<E>();
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const dependencies = useRef<unknown[]>(nextDeps);

  const isMounted = useRef(true);

  const checkIfPromiseIsStillValid = useCallback(
    (dependenciesAtTimeOfPromise: unknown[]): boolean => {
      return (
        isMounted.current && dependenciesMatch(dependenciesAtTimeOfPromise, dependencies.current)
      );
    },
    []
  );

  const run = useCallback(() => {
    setHasFinished(false);
    promise()
      .then((r) => checkIfPromiseIsStillValid(nextDeps) && setResults(r))
      .catch((e) => checkIfPromiseIsStillValid(nextDeps) && setError(e))
      .finally(() => checkIfPromiseIsStillValid(nextDeps) && setHasFinished(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, nextDeps);

  useEffect(() => {
    isMounted.current = true;
    dependencies.current = nextDeps;
    run();
    return () => {
      isMounted.current = false;
    };
    // nextDeps is already a dependency of run
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return useMemo(
    () => ({
      results,
      error,
      loading: !hasFinished,
      refetch: run
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasFinished, results]
  );
};

export default usePromiseMemo;
