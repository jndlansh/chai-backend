import dotenv from 'dotenv';
import connctDB from "./db/index.js"
import {app} from "./app.js";
dotenv.config({
    path: "./.env"
});

connctDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
    f
})