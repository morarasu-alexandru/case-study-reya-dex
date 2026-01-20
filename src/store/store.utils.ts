import { create, type StoreApi, type UseBoundStore } from "zustand";
import { devtools, type NamedSet } from "zustand/middleware";

const isBrowser = typeof window !== "undefined";

export interface StoreState<D, A> {
  data: D;
  actions: A;
}

export type Store<D, A> = UseBoundStore<StoreApi<StoreState<D, A>>>;

export type UpdateData<D> = (
  newData: Partial<D> | ((data: D) => Partial<D>),
  action: string,
  details?: unknown,
) => void;

export function createStore<D, A>(
  name: string,
  createStore: (
    setState: NamedSet<StoreState<D, A>>,
    getState: StoreApi<StoreState<D, A>>["getState"],
    updateData: UpdateData<D>,
  ) => StoreState<D, A>,
): Store<D, A> {
  return create<StoreState<D, A>>()(
    devtools<StoreState<D, A>>(
      (setState, getState) => {
        const updateData = (
          newData: Partial<D> | ((data: D) => Partial<D>),
          action: string,
          details?: unknown,
        ) => {
          setState(
            ({ data }): { data: D } => ({
              data: {
                ...data,
                ...(typeof newData === "function" ? newData(data) : newData),
              },
            }),
            undefined,
            {
              type: action,
              payload: details,
            } as {
              type: string;
              payload?: unknown;
            },
          );
        };

        return createStore(setState, getState, updateData);
      },
      {
        name,
        enabled: isBrowser,
      },
    ),
  );
}

export function getActions<A>(state: StoreState<unknown, A>): A {
  return state.actions;
}

export function getData<D>(state: StoreState<D, unknown>): D {
  return state.data;
}

export function useActions<A>(useStore: Store<unknown, A>): A {
  return useStore(getActions);
}

export function useData<D>(useStore: Store<D, unknown>): D {
  return useStore(getData);
}
