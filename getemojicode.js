const fs = require("fs");
let emojicode = [];

for (let index = 128512; index < 128567; index++) {
	emojicode.push(`<p>&#${index};</p>`);
}

console.log(emojicode);
fs.writeFile("./emoji.txt", emojicode.toString(), (err) => {
	console.log(err);
});
