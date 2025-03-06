
export const formatFirstUpperCaseEvery = (text: string) => {
    return text.trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
}