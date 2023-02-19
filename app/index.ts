import { PrismaClient } from "@prisma/client";

import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import { specs } from "../swagger";
import {
  getBlogs,
  createBlog,
  updateBlog,
  searchBlog,
  searchFullText
} from "../controller/blog.controller";
import errorHandle from "../utils/errorHandle";

const app = express();
require("dotenv").config();
const prisma = new PrismaClient();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

// Create a new blog post
/**
 * @swagger
 * /create-blog:
 *   post:
 *     summary: Create a new blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog post.
 *               content:
 *                 type: string
 *                 description: The content of the blog post.
 *               createdBy:
 *                 type: string
 *                 description: createdBy name
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad Request
 *     tags:
 *       - Blog
 */
app.post("/create-blog", async (req: Request, res: Response) => {
  await errorHandle({ res, controllerFn: createBlog, params: req.body });
});

// Update a blog post
/**
 * @swagger
 * /update-blog/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the blog post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the blog post.
 *               content:
 *                 type: string
 *                 description: The updated content of the blog post.
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *     tags:
 *       - Blog
 */
app.put("/update-blog/:id", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = req.params.id;
  await errorHandle({
    res,
    controllerFn: updateBlog,
    params: { id, title, content }
  });
});

// Get all blog posts
/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Retrieve all blog posts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Not Found
 *     tags:
 *       - Blog
 */
app.get("/blogs", async (req: Request, res: Response) => {
  await errorHandle({ res, controllerFn: getBlogs });
});

// Get blog post by ID
/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Retrieve a blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the blog post to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Not Found
 *     tags:
 *       - Blog
 */

app.get("/blog/:id", async (req: Request, res: Response) => {
  await errorHandle({ res, controllerFn: getBlogs, params: req.params.id });
});

// Search for text in blog post content
/**
 * @swagger
 * /blog/search:
 *   get:
 *     summary: Search for blog posts by content in MongoDB.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: The search query string.
 *     responses:
 *       200:
 *         description: A list of blog posts that match the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid search query parameter.
 *       500:
 *         description: Server error.
 */
app.get("/blog/search", async (req: Request, res: Response) => {
  await errorHandle({ controllerFn: searchBlog, res, params: req.query.q });
});

// Search Full Text
/**
 * @swagger
 * /search-full-text:
 *   get:
 *     summary: Full-text search for blog post title or content in MongoDB.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: The search query string.
 *     responses:
 *       200:
 *         description: A list of blog posts that match the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       400:
 *         description: Invalid search query parameter.
 *       500:
 *         description: Server error.
 */
app.get("/search-full-text", async (req: Request, res: Response) => {
  const searchQuery = req.query.q;

  await errorHandle({
    res,
    controllerFn: searchFullText,
    params: { searchQuery }
  });
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
