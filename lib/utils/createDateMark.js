import { blueishGrey } from "../../src/colorPalette";

export default function createDateMark(date) {
  return {
    [`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`]: {
      marked: true,
      dotColor: blueishGrey
    }
  };
}
