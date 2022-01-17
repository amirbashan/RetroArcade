export function CellFix(details) {
  let cell, style;
  switch (details.value) {
    case 1:
      style = { color: "#0000F7" };
      break;
    case 2:
      style = { color: "#008000" };
      break;
    case 3:
      style = { color: "#FA0E0E" };
      break;
    case 4:
      style = { color: "#2E2F82" };
      break;
    case 5:
      style = { color: "#800001" };
      break;
    case 6:
      style = { color: "#00807F" };
      break;
    case 7:
      style = { color: "#C0C0C0" };
      break;
    case 8:
      style = { color: "#808080" };
      break;
    default:
      style = { color: "#FFFFFF" };
      break;
  }
  isNaN(details.value) ? (style.fontSize = "20px") : (style.fontSize = "30px");
  style.fontWeight = "bold";
  style.background = "#BDBDBD";
  style.backgroundSize = "contain";
  style.border = "3px solid #ACACAC";
  details.value ? (cell = details.value) : (cell = "");
  if (details.value === "X") cell = "💣";
  return [cell, style];
}
