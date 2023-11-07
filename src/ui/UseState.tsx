import { ReactNode, useState } from "react";

export function UseState<T>({
  initialState,
  children,
}: {
  initialState: T;
  children: (args: [state: T, setState: (nextState: T) => void]) => ReactNode;
}) {
  const [state, setState] = useState<T>(initialState);
  return children([state, setState]);
}
