class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  public set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  }

  public get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage`, error);
      return null;
    }
  }

  //  Getter/Setter example using property syntax
  // set theme(value: string) {
  //   this.set("theme", value);
  // }

  // get theme(): string {
  //   return this.get<string>("theme") || "light";
  // }

  // Remove specific item
  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items
  public clear(): void {
    localStorage.clear();
  }
}

export const storage = LocalStorageService.getInstance();
