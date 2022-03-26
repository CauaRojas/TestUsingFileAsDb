// create an express api
import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send(getDumpArray());
});

app.put('/', (req, res) => {
	fs.writeFile(
		'dump.txt',
		getDumpText() + '\n' + (req.query.todo?.toString() as string),
		(err) => {
			if (err) {
				res.send('Error writing file');
				return;
			}
			res.send('File written');
		}
	);
});

// function to get the dump text
const getDumpText = (): string => {
	const dumpFile = fs.readFileSync('./dump.txt', 'utf8');
	return dumpFile;
};

//function to convert the dump text to an array
const getDumpArray = (): string[] => {
	const dumpFile = getDumpText();
	return dumpFile.split('\n');
};

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
