export function onColorForPercentage(inputNumber, scale) {
  let result = "gray";
  let base = 1;

  if (inputNumber && scale && base) {
    const red = scale.inv_scale_red;
    const yellow = scale.inv_scale_yellow;
    const green = scale.inv_scale_green;
    const blue = scale.inv_scale_blue;
    const dir = "asc";

    let info = (inputNumber / base) * 100;
    let newColor = "gray";

    info > blue
      ? (newColor = "blue")
      : info > green
        ? (newColor = "green")
        : info > yellow
          ? (newColor = "yellow")
          : info > red
            ? (newColor = "red")
            : info === 0
              ? (newColor = "white")
              : (newColor = "gray");

    result = `${newColor}`;
  }

  return result;
}

export function onColorForCallsOnQueue(inputNumber, waitTime) {
  let result = "white";
  let newColor = "red";

  typeof inputNumber !== "number" ||
  inputNumber === 0 ||
  inputNumber === null ||
  inputNumber === undefined
    ? (newColor = "white")
    : inputNumber > waitTime
      ? (newColor = "red")
      : inputNumber > waitTime * 0.5 && inputNumber <= waitTime
        ? (newColor = "yellow")
        : inputNumber > waitTime * 0 && inputNumber <= waitTime * 0.5
          ? (newColor = "green")
          : "white";

  result = `${newColor}`;

  return result;
}
