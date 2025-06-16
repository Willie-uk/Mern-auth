import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import connectToDatabase from './config/db';
import router from "./routes/auth.routes";
import helmet from 'helmet';
// import csurf from 'csurf';
import mongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss-clean';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true
}));
app.use(helmet());
// app.use(csurf({ cookie: true }));
app.use(mongoSanitize());
// app.use(xss());


// ✅ Apply CSRF middleware globally but skip safe methods
// app.use(
//   csurf({
//     cookie: true,
//     ignoreMethods: ["GET", "HEAD", "OPTIONS"],
//   })
// );

// // ✅ CSRF token route
// app.get("/csrf-token", (req, res) => {
//   res.status(200).json({ csrfToken: req.csrfToken() });
// });


// Set up routing
app.use(router); // ✅ Correct use of exported Router
 

// Connect to MongoDB
const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Project is in ${NODE_ENV} mode`);
    });
  };
  
  startServer();
