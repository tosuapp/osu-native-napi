import { ManagedObjectHandle } from "@tosuapp/osu-native-napi";

export interface TimedLazy<T> {
  enumerator: ManagedObjectHandle,
  next: (handle: ManagedObjectHandle) => T | null;
  destroy: (handle: ManagedObjectHandle) => boolean;
}