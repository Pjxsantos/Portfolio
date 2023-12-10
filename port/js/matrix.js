const get_japanese = () => {
  const r = [];
  for (let x = 0x4e00; x < 0x4e20; x++) r.push(x);
  return r;
};
const char_set = (
  "abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_+=" +
  String.fromCodePoint(...get_japanese())
).split("");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const random_bool = (p) => Math.random() < p;
const random_int = (n) => Math.floor(Math.random() * n) % n;
const choose_random = (xs) => xs[random_int(xs.length)];
const reset = (div_matrix, num_rows, num_cols) => {
  const grid = [];
  for (let r = 0; r < num_rows; r++) {
    const row = document.createElement("div");
    const rowE = [];
    for (let c = 0; c < num_cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = choose_random(char_set);
      row.appendChild(cell);
      rowE.push(cell);
    }
    div_matrix.appendChild(row);
    grid.push(rowE);
  }
  return grid;
};

const main = async () => {
  // console.log('window.screen.width', window.screen.width);
  // for(let x = 0x4e00; x < 0x9faf; x++) char_set.push(String.fromCodePoint([x])); // 20911 characters
  // for (let x = 0x4e00; x < 0x9faf; x += 1000) {
  //   char_set.push(String.fromCodePoint([x]));
  // }
  // const get_japanese = () => {
  //   const r = [];
  //   for (let x = 0x4e00; x < 0x4e20; x++) {
  //     r.push(x);
  //   }
  //   return r;
  // }
  // const y = String.fromCodePoint(...get_japanese());
  // console.log(y);
  // for (let x = 0x4e00; x < 0x4e20; x++) {
  //   char_set.push(String.fromCodePoint([x]));
  // }
  console.log(char_set, char_set.length);
  const div_matrix = document.querySelector("#div-matrix");
  console.log("div_matrix.style.width", div_matrix.style.width);
  const div_matrix_rect = div_matrix.getBoundingClientRect();
  console.log("div_matrix.getBoundingClientRect", div_matrix_rect);

  const num_rows = 64;
  const _num_cols = Math.floor(div_matrix_rect.width / 16); // 16px ~ 1em // 64; // 64;
  const num_cols = Math.max(Math.min(_num_cols, 64), 1);
  console.log("num_rows", num_rows, "num_cols", num_cols);
  // const num_instances = 10;
  // const step_size = 4;
  const max_waves = Math.floor((num_cols * num_cols) / 2); // 64 * 10;
  const grid = reset(div_matrix, num_rows, num_cols);
  let last_t = 0;
  const t_speed = 50;
  let curr_row = 0;
  let curr_col = 0;
  const waves = new Map();
  let wave_id = 0;
  const step = (t) => {
    requestAnimationFrame(step);
    if (t - last_t < t_speed) return;
    last_t = t;
    if (waves.size < max_waves && random_bool(0.5)) {
      // waves.set(wave_id, { r: random_int(num_rows), c: random_int(num_cols) });
      waves.set(wave_id, { r: 0, c: random_int(num_cols) });
      wave_id++;
    }
    const to_be_removed = [];
    for (let [k, wave] of waves) {
      const { r, c } = wave;
      // prev_cell.classList.remove("fade");
      // cell.textContent = choose_random(char_set);
      if (wave.r >= num_rows) {
        to_be_removed.push(k);
        continue;
      }
      const cell = grid[r][c];
      cell.textContent = choose_random(char_set);
      cell.classList.toggle("fade");
      if (random_bool(0.05)) cell.classList.toggle("brighter");
      wave.r++;
    }
    to_be_removed.forEach((k) => waves.delete(k));
  };
  requestAnimationFrame(step);
};

main().catch(console.error);