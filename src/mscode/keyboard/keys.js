const keyNum = [
  { name: '1', key: '1', keyCode: 49 },
  { name: '2', key: '2', keyCode: 50 },
  { name: '3', key: '3', keyCode: 51 },
  { name: '4', key: '4', keyCode: 52 },
  { name: '5', key: '5', keyCode: 53 },
  { name: '6', key: '6', keyCode: 54 },
  { name: '7', key: '7', keyCode: 55 },
  { name: '8', key: '8', keyCode: 56 },
  { name: '9', key: '9', keyCode: 57 },
  { name: '0', key: '0', keyCode: 48 }
];

const keyLetter = [
  [
    { name: 'Q', key: 'q', keyCode: 81 },
    { name: 'W', key: 'w', keyCode: 87, light: 1 },
    { name: 'E', key: 'e', keyCode: 69 },
    { name: 'R', key: 'r', keyCode: 82 },
    { name: 'T', key: 't', keyCode: 84 },
    { name: 'Y', key: 'y', keyCode: 89 },
    { name: 'U', key: 'u', keyCode: 85 },
    { name: 'I', key: 'i', keyCode: 73 },
    { name: 'O', key: 'o', keyCode: 79 },
    { name: 'P', key: 'p', keyCode: 80 }
  ],
  [
    { name: 'A', key: 'a', keyCode: 65, light: 1 },
    { name: 'S', key: 's', keyCode: 83, light: 1 },
    { name: 'D', key: 'd', keyCode: 68, light: 1 },
    { name: 'F', key: 'f', keyCode: 70 },
    { name: 'G', key: 'g', keyCode: 71 },
    { name: 'H', key: 'h', keyCode: 72 },
    { name: 'J', key: 'j', keyCode: 74 },
    { name: 'K', key: 'k', keyCode: 75 },
    { name: '↑', key: 'ArrowUp', keyCode: 38, light: 1 },
    { name: 'L', key: '76' }
  ],
  [
    { name: 'Z', key: 'z', keyCode: 90 },
    { name: 'X', key: 'x', keyCode: 88 },
    { name: 'C', key: 'c', keyCode: 67 },
    { name: 'V', key: 'v', keyCode: 86 },
    { name: 'B', key: 'b', keyCode: 66 },
    { name: 'N', key: 'n', keyCode: 78 },
    { name: 'M', key: 'm', keyCode: 77 },
    { name: '←', key: 'ArrowLeft', keyCode: 37, light: 1 },
    { name: '↓', key: 'ArrowDown', keyCode: 40, light: 1 },
    { name: '→', key: 'ArrowRight', keyCode: 39, light: 1 }
  ]
];

export { keyNum, keyLetter };
