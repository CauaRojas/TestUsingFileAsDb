// create an express api
import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const getDumpText = (): string => {
	const dumpFile = fs.readFileSync('./dump.txt', 'utf8');
	return dumpFile;
};

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

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
