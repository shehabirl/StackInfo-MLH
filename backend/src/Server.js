import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import config from 'dotenv';
import connect from "./utils/db";
import createError from 'http-errors';
import companiesRouter from "./resources/company/company.router"
import usersRouter from './resources/user/user.router'
import authRouter from './utils/auth/auth.router';
import {redisClient} from './utils/redis/redisClient';

class Server {
    constructor() {
        this.app = express();
        /*TODO Fix 
        the events.js:352
        throw er; // Unhandled 'error' event..
        Error: listen EADDRINUSE: address already in use :::3000
        */
        this.port = process.env.PORT || 8080; // Loaded from .env file
        this.paths = {
            auth: "/api/auth",
            companies: "/api/companies",
            users: "/api/users"
        };
        this.middlewares();
        this.routes();
        //Handling errors and unindentified routes, this middleware must come at the end of the call stack
        this.ErrorHandling();
    }

    middlewares() {
        this.app.use(cors()); // Enable CORS
        /**
         * app.use(bp.json()) looks at requests where the Content-Type: application/json header is present and transforms the text-based JSON input
         *  into JS-accessible variables under req.body. app.use(bp.urlencoded({extended: true}) does the same for URL-encoded requests.
         *  the extended: true precises that the req.body object will contain values of any type instead of just strings.
         */
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(morgan('dev')); //Logging
    }

    ErrorHandling() {
        this.app.use(async (req, res, next) => {
            next(createError.NotFound());
        })
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500)
            res.send({
                error: {
                    status: err.status || 500,
                    message: err.message
                }
            })
        })
    }
    // Bind controllers to routes
    routes() {
        this.app.use(this.paths.companies, companiesRouter);
        this.app.use(this.paths.users, usersRouter);
        this.app.use(this.paths.auth, authRouter);
    }

    start() {
        //Make sure to connect to database
        connect()
        this.app.listen(this.port, () => {
            console.log("Stack Info server running on port: ", this.port);
        });
    }
}

export default Server;