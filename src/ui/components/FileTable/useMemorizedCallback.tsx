import { useMemo, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type noop = (this: any, ...arguments_: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...arguments_: Parameters<T>
) => ReturnType<T>;

export function useMemoizedCallback<T extends noop>(function_: T) {
  const functionReference = useRef<T>(function_);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  functionReference.current = useMemo<T>(() => function_, [function_]);

  const memoizedFunction = useRef<PickFunction<T>>();

  if (!memoizedFunction.current) {
    memoizedFunction.current = function (this, ...arguments_) {
      return functionReference.current.apply(this, arguments_);
    };
  }

  return memoizedFunction.current as T;
}
