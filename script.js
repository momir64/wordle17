let finished = false;

function key_press(key) {
  if (col == 5 || finished)
    return;

  document.getElementById(row.toString() + col).innerHTML = key;
  document.getElementById(row.toString() + col).classList.add("pulse");
  col = Math.min(col + 1, 5);
}


function key_delete() {
  if (finished)
    return;

  col = Math.max(col - 1, 0);
  document.getElementById(row.toString() + col).innerHTML = "";
  document.getElementById(row.toString() + col).classList.remove("pulse");
  document.getElementById(row.toString()).classList.remove("jiggle");
}


document.addEventListener("keydown", (event) => {
  if (event.code == "Backspace")
    key_delete();
  if (event.code == "Enter")
    key_enter();
  else if (event.code in keys)
    key_press(keys[event.code]);
}, false);


function key_enter() {
  if (col != 5 || finished)
    return;

  input = "";

  for (i = 0; i < 5; i++)
    input += document.getElementById(row.toString() + i).innerHTML.toLowerCase();

  if (input == solution)
    finished = true;

  try {
    if (!dict[input[0]][input[1]][input[2]][input[3]][input[4]])
      throw -1;

    for (i = 0; i < 5; i++) {
      if (solution[i] == input[i]) {
        setTimeout((i, row) => {
          document.getElementById(row.toString() + i).classList.add("green");
          if (i == 4 && solution == input)
            finish();
        }, i * 220, i, row);
        document.getElementById(input[i].toUpperCase()).classList.remove("kyellow");
        document.getElementById(input[i].toUpperCase()).classList.add("kgreen");
      } else if (!solution.includes(input[i])) {
        setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("gray"); }, i * 220, i, row);
        document.getElementById(input[i].toUpperCase()).classList.add("kgray");
      } else {
        let a = 0;
        let b = 0;
        for (j = 0; j < 5; j++) {
          if (solution[j] != input[j] && solution[j] == input[i]) a++;
          if (solution[j] != input[j] && input[j] == input[i] && j <= i) b++;
        }
        if (b <= a) {
          setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("yellow"); }, i * 220, i, row);
          document.getElementById(input[i].toUpperCase()).classList.add("kyellow");
        } else {
          setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("gray"); }, i * 220, i, row);
          document.getElementById(input[i].toUpperCase()).classList.add("kgray");
        }
      }
    }

    row++;
    col = 0;
    setTimeout((row) => { if (row == 5 && input != solution) shift_up(); }, 1800, row);
  } catch (e) {
    document.getElementById(row.toString()).classList.add("jiggle");
    setTimeout(() => { document.getElementById(row.toString()).classList.remove("jiggle"); }, 500);
  }
}


function finish() {
  document.getElementById(row.toString() + 0).innerHTML = '';
  document.getElementById(row.toString() + 1).innerHTML = 'T';
  document.getElementById(row.toString() + 2).innerHTML = 'E';
  document.getElementById(row.toString() + 3).innerHTML = '♡';
  document.getElementById(row.toString() + 4).innerHTML = '';
  document.getElementById(row.toString() + 3).style.lineHeight = "0.5rem";
  document.getElementById(row.toString() + 3).style.fontSize = "2.5rem";
  for (i = 0; i < 5; i++) {
    document.getElementById(row.toString() + i).classList.add("invisible");
    setTimeout((i, row) => { document.getElementById(row.toString() + i).classList.add("fgreen"); }, (i + 1) * 220 + 666, i, row);
  }
}


function shift_up() {
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 5; j++) {
      document.getElementById(i.toString() + j).className = '';
      document.getElementById(i.toString() + j).classList.add('colapse');

      if (i < 5) {
        document.getElementById(i.toString() + j).innerHTML = document.getElementById((i + 1).toString() + j).innerHTML;
        document.getElementById(i.toString() + j).style.backgroundColor = window.getComputedStyle(document.getElementById((i + 1).toString() + j)).getPropertyValue('background-color');
      } else {
        document.getElementById(i.toString() + j).innerHTML = '';
        document.getElementById(i.toString() + j).style.backgroundColor = '#121213';
      }

      setTimeout((i, j) => {
        document.getElementById(i.toString() + j).classList.remove('colapse');
        document.getElementById(i.toString() + j).classList.add('expand');
        setTimeout((i, j) => { document.getElementById(i.toString() + j).classList.remove("expand"); }, 500, i, j);
      }, 500, i, j);
    }
  }

  row--;
}