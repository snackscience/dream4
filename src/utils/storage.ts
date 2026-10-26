import { DiagnosticResult } from '../types/career';

const STORAGE_KEY = 'ggumkki_navi_diagnostic_history';
const THEME_KEY = 'ggumkki_navi_theme';

export function saveDiagnosticResult(result: DiagnosticResult): void {
  try {
    const existing = getDiagnosticHistory();
    // Prepend new result
    const updated = [result, ...existing.filter((item) => item.id !== result.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function getDiagnosticHistory(): DiagnosticResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as DiagnosticResult[];
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return [];
  }
}

export function deleteDiagnosticResult(id: string): DiagnosticResult[] {
  try {
    const existing = getDiagnosticHistory();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete from localStorage:', error);
    return [];
  }
}

export function getThemePreference(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function setThemePreference(isDark: boolean): void {
  try {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
}
