import fs from 'fs';

const code = fs.readFileSync('src/screens/user/main/BookingScreen.jsx', 'utf-8');

const indices = [63341, 63343, 63340, 63344, 63262, 63350, 156678, 316373, 153628, 317586, 153596, 351472, 65712, 351489, 65690, 351490, 63408, 351493];

indices.forEach(idx => {
  const before = code.substring(0, idx);
  const lineNum = before.split('\n').length;
  const colNum = idx - before.lastIndexOf('\n');
  const line = code.split('\n')[lineNum - 1];
  console.log(`Index ${idx} -> Line ${lineNum}, Col ${colNum}: "${line.trim()}"`);
});
