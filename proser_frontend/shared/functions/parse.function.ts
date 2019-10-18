export function onJsonParseToArray(data: string) {
  try {
    let a = JSON.parse(data);
    return a;
  } catch (error) {
    console.error(
      "err on JsonParse",
      error,
      "error in the above string (in this case, yes)!"
    );
  }
}

export function onJsonParseToObject(data: string) {
  try {
    let b = JSON.parse(data);
    let a = b[0];
    return a;
  } catch (error) {
    console.error(
      "err on JsonParse",
      error,
      "error in the above string (in this case, yes)!"
    );
  }
}

export function onJsonDoubleParse(data: string) {
  try {
    let b = JSON.parse(JSON.parse(JSON.stringify(data)));
    return b;
  } catch (error) {
    console.error(
      "err on onJsonDoubleParse",
      error,
      "error in the above string (in this case, yes)!"
    );
  }
}

export function saveParse(data: string | null) {
  let result = data;

  if (typeof data === "string") {
    result = JSON.parse(data);
  }
  return result;
}
