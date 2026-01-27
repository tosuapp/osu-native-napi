import type { ManagedObjectHandle } from "@tosuapp/osu-native-napi-raw";

export abstract class NativeHandleOwner<
  TNative extends { handle: ManagedObjectHandle },
> {
  protected destroyed = false;

  constructor(readonly native: TNative) {}

  get handle(): ManagedObjectHandle {
    return this.native.handle;
  }

  protected ensureAlive(): void {
    if (!this.destroyed) {
      return;
    }

    throw new Error(`${this.constructor.name} is destroyed`);
  }
}
