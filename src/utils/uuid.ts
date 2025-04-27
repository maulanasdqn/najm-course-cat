export const extractUuid = (str: string) => {
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const match = str.match(uuidRegex);

  if (match) {
    return match[0];
  } else {
    return null; // Or handle the case where no UUID is found
  }
};
