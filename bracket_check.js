import fs from 'fs';

let code = fs.readFileSync('src/screens/user/main/BookingScreen.jsx', 'utf8');

// Replace regex literal
code = code.replace('const match = airportStr.match(/\\(([^)]+)\\)/);', 'const match = null;                             ');

// Clean code parser
let inSingleComment = false;
let inMultiComment = false;
let inString = null;
let cleanCode = '';

for (let i = 0; i < code.length; i++) {
  const char = code[i];
  const nextChar = code[i + 1];

  if (inSingleComment) {
    if (char === '\n' || char === '\r') {
      inSingleComment = false;
      cleanCode += char;
    }
    continue;
  }
  if (inMultiComment) {
    if (char === '*' && nextChar === '/') {
      inMultiComment = false;
      i++;
    }
    continue;
  }
  if (inString) {
    if (char === '\\') {
      i++;
      continue;
    }
    if (char === inString) {
      inString = null;
    }
    continue;
  }
  if (char === '/' && nextChar === '/') {
    inSingleComment = true;
    i++;
    continue;
  }
  if (char === '/' && nextChar === '*') {
    inMultiComment = true;
    i++;
    continue;
  }
  if (char === "'" || char === '"' || char === '`') {
    inString = char;
    continue;
  }
  cleanCode += char;
}

// Clean map
let cleanIndex = 0;
const cleanToOrigMap = [];
inSingleComment = false;
inMultiComment = false;
inString = null;

for (let i = 0; i < code.length; i++) {
  const char = code[i];
  const nextChar = code[i + 1];
  if (inSingleComment) {
    if (char === '\n' || char === '\r') inSingleComment = false;
    continue;
  }
  if (inMultiComment) {
    if (char === '*' && nextChar === '/') {
      inMultiComment = false;
      i++;
    }
    continue;
  }
  if (inString) {
    if (char === '\\') {
      i++;
      continue;
    }
    if (char === inString) inString = null;
    continue;
  }
  if (char === '/' && nextChar === '/') {
    inSingleComment = true;
    i++;
    continue;
  }
  if (char === '/' && nextChar === '*') {
    inMultiComment = true;
    i++;
    continue;
  }
  if (char === "'" || char === '"' || char === '`') {
    inString = char;
    continue;
  }
  cleanToOrigMap[cleanIndex] = i;
  cleanIndex++;
}

function getLineAndCol(origIdx) {
  const before = code.substring(0, origIdx);
  const line = before.split('\n').length;
  const col = origIdx - before.lastIndexOf('\n');
  return { line, col };
}

const stack = [];

for (let i = 0; i < cleanCode.length; i++) {
  const char = cleanCode[i];
  const origIdx = cleanToOrigMap[i];
  const loc = getLineAndCol(origIdx);

  if (char === '{' || char === '(' || char === '[') {
    stack.push({ char, loc });
  } else if (char === '}' || char === ')' || char === ']') {
    if (stack.length === 0) {
      console.log(`Unmatched closing ${char} at Line ${loc.line}, Col ${loc.col}`);
      continue;
    }
    const top = stack.pop();
    
    // Log specific debug information around line 3484
    if (loc.line >= 3480 && loc.line <= 3490) {
      console.log(`Processing char '${char}' at Line ${loc.line}, Col ${loc.col}. Popped '${top.char}' from Line ${top.loc.line}, Col ${top.loc.col}`);
    }
  }
}
