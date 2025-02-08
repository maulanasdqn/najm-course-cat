import { FC, PropsWithChildren, ReactElement, ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type TBoundary = PropsWithChildren & {
  error: ReactNode;
  loading: ReactNode;
};

export const AppBoundary: FC<TBoundary> = (props): ReactElement => {
  return (
    <ErrorBoundary fallback={props.error}>
      <Suspense fallback={props.loading}>{props.children}</Suspense>
    </ErrorBoundary>
  );
};
