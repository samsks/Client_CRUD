import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { clientRouter, contactRouter, refreshRouter, sessionRouter } from "./routes";
import { handleError } from "./errors";
import "dotenv/config";


const app = express()
app.use(express.json())

const API_DETAIL = process.env.API_DETAIL || "/api/v1";

app.use(`${API_DETAIL}/clients`, clientRouter)
app.use(`${API_DETAIL}/login`, sessionRouter)
app.use(`${API_DETAIL}/refresh`, refreshRouter)
app.use(`${API_DETAIL}/contacts`, contactRouter)


app.use(handleError)

export default app