export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const isFormData = (body: any) => {
  if (!body) {
    return false;
  }

  return body instanceof FormData;
};

export function convertToCapitalizedCase(text: string) {
  return text
    .toLowerCase() // Ensure all text is in lowercase first
    .split("_") // Split the string into an array at each underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string with spaces
}
