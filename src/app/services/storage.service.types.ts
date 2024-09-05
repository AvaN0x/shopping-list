export declare interface Storageable {
  /**
   * A function invoked to populate the instance with the data stored in the storage.
   */
  populate(data: string): void;

  /**
   * A function to get the data to store in the storage.
   */
  serialize(): string;
}
