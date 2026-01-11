/**
 * Validates if a URL is safe to use in an image source.
 * Allows http, https, data, blob protocols and relative paths.
 * Blocks javascript: and other potentially malicious protocols.
 */
export function isValidImageUrl(url: string): boolean {
  try {
    // Allow relative paths
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      return true;
    }

    const parsed = new URL(url);
    const allowedProtocols = ['http:', 'https:', 'data:', 'blob:'];
    return allowedProtocols.includes(parsed.protocol);
  } catch {
    // If URL parsing fails, check if it might be a relative path without leading ./ or /
    // simpler check: does it look like a protocol?
    // specific check for javascript: to be safe
    if (url.trim().toLowerCase().startsWith('javascript:')) {
      return false;
    }
    
    // Assume relative or malformed but likely safe if no unsafe protocol detected
    // But for stricter security, we might want to return false if it's not clearly relative.
    // Given the context of the app (file paths), we should probably allow things that don't parse as URLs
    // if they don't look dangerous.
    return !url.includes(':');
  }
}
