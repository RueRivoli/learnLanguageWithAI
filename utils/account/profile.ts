export const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean) // remove extra spaces
    .map((word) => word[0].toUpperCase())
    .join("");
};
