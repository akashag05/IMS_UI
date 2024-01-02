export default function replacePeriodsWithUnderscoresSingleObject(obj: any) {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/\./g, "_"); // Replace all periods with underscores
      result[newKey] = obj[key];
    }
  }

  return result;
}
