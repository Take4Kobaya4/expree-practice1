import express from 'express';
import { Response } from 'express';
import { Request } from 'express';

const app = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});