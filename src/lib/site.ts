/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

export const REPO_URL = "https://github.com/PsyGioX/fontify-generator";
export const AUTHOR_NAME = "PsyGioX";
export const AUTHOR_URL = "https://github.com/PsyGioX";
export const START_YEAR = 2025;

/** "2025" in the first year, "2025–2026" afterwards. */
export function copyrightYears(now: Date = new Date()): string {
  const year = now.getFullYear();
  return year > START_YEAR ? `${START_YEAR}–${year}` : `${START_YEAR}`;
}
