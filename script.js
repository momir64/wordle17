let row = 0;
let col = 0;

function key_press(key) {
  document.getElementById(row.toString() + col).innerHTML = key;
  col = Math.min(col + 1, 4);
}

function key_delete() {
  document.getElementById(row.toString() + col).innerHTML = "";
  col = Math.max(col - 1, 0);
}
