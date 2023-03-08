import qa from "../config/qa.js";
import supertest from "supertest";
const request = supertest(qa.baseUrl)
import * as dotenv from 'dotenv'
dotenv.config()

export default request;