/**
 * Tiny class-name joiner. Falsy values are dropped, so callers can write:
 *   cn("base", isActive && "active", { flex: true })
 * without pulling in clsx.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue): void => {
    if (!value && value !== 0) return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "object") {
      for (const key of Object.keys(value)) {
        if (value[key]) out.push(key);
      }
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}
