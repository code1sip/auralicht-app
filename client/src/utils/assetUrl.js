export function assetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.replace(/^\.\//, '').replace(/^\//, '');
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}

export default assetUrl;
