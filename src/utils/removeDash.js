export default function removeDash(str) {
  if (!str) return "";
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
