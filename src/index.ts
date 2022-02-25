import app from './app';
import './database/database';

const port = process.env.PORT || 4001;

app.listen(4001, () => {
    console.log(`Server at http:localhost:${ port }`)
});