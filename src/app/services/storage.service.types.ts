import type { Signal } from '@angular/core';

export declare interface Storageable {
  /**
   * The name of the storage used to store the data.
   */
  readonly storageName: string;

  /**
   * A function invoked to populate the instance with the data stored in the storage.
   */
  populate(data: string): void;

  /**
   * A function to get the data to store in the storage.
   */
  serialize: Signal<string>;
}
