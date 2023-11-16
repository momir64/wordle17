function key_press(key) {
  if (col == 5) return;

  document.getElementById(row.toString() + col).innerHTML = key;
  document.getElementById(row.toString() + col).classList.add("pulse");
  col = Math.min(col + 1, 5);
}

function key_delete() {
  col = Math.max(col - 1, 0);
  document.getElementById(row.toString() + col).innerHTML = "";
  document.getElementById(row.toString() + col).classList.remove("pulse");
  document.getElementById(row.toString()).classList.remove("jiggle");
}

document.addEventListener(
  "keydown",
  (event) => {
    if (event.code == "Backspace") key_delete();
    if (event.code == "Enter") key_enter();
    else if (event.code in keys) key_press(keys[event.code]);
  },
  false
);

function key_enter() {
  if (col != 5) return;
  input = "";

  for (i = 0; i < 5; i++)
    input += document
      .getElementById(row.toString() + i)
      .innerHTML.toLowerCase();

  try {
    if (!dict[input[0]][input[1]][input[2]][input[3]][input[4]]) throw -1;

    for (i = 0; i < 5; i++) {
      if (solution[i] == input[i]) {
        setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("green"); }, i * 220, i, row);
        document.getElementById(input[i].toUpperCase()).classList.remove("kyellow");
        document.getElementById(input[i].toUpperCase()).classList.add("kgreen");
      }
      else if (!solution.includes(input[i])) {
        setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("gray"); }, i * 220, i, row);
        document.getElementById(input[i].toUpperCase()).classList.add("kgray");
      }
      else {
        let a = 0;
        let b = 0;
        for (j = 0; j < 5; j++) {
          if (solution[j] != input[j] && solution[j] == input[i]) a++;
          if (solution[j] != input[j] && input[j] == input[i] && j <= i) b++;
        }
        if (b <= a) {
          setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("yellow"); }, i * 220, i, row);
          document.getElementById(input[i].toUpperCase()).classList.add("kyellow");
        }
        else {
          setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("gray"); }, i * 220, i, row);
          document.getElementById(input[i].toUpperCase()).classList.add("kgray");
        }
      }
    }

    row++;
    col = 0;
  } catch (e) {
    document.getElementById(row.toString()).classList.add("jiggle");
    setTimeout(() => {
      document.getElementById(row.toString()).classList.remove("jiggle");
    }, 500);
  }
}