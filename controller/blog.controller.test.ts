import { PrismaClient } from "@prisma/client";
import {
  createBlog,
  updateBlog,
  getBlogs,
  getById,
  searchBlog,
  searchFullText
} from "./blog.controller";

const prisma = new PrismaClient();

beforeAll(async () => {
  // clear database before running tests
  await prisma.blog.deleteMany();
});

afterAll(async () => {
  // disconnect prisma client
  await prisma.$disconnect();
});

describe("Blog Service", () => {
  describe("createBlog", () => {
    it("should create a new blog", async () => {
      const blog = await createBlog({
        title: "Test Blog",
        content: "This is a test blog post",
        createdBy: "Test User"
      });
      expect(blog.title).toBe("Test Blog");
      expect(blog.content).toBe("This is a test blog post");
      expect(blog.createdBy).toBe("Test User");
    });
  });

  describe("updateBlog", () => {
    it("should update an existing blog", async () => {
      const blog = await createBlog({
        title: "Test Blog",
        content: "This is a test blog post",
        createdBy: "Test User"
      });
      const updatedBlog = await updateBlog({
        id: blog.id,
        title: "Updated Blog",
        content: "This is the updated content"
      });
      expect(updatedBlog.title).toBe("Updated Blog");
      expect(updatedBlog.content).toBe("This is the updated content");
    });
  });
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  describe("getById", () => {
    it("should return the blog with the given id", async () => {
      const blog = await createBlog({
        title: "Test Blog",
        content: "This is a test blog post",
        createdBy: "Test User"
      });
      const retrievedBlog = await getById(blog.id);
      expect(retrievedBlog?.title).toBe(blog.title);
      expect(retrievedBlog?.content).toBe(blog.content);
      expect(retrievedBlog?.createdBy).toBe(blog.createdBy);
    });
  });

  describe("searchBlog", () => {
    it("should return blogs that contain the search query in the content", async () => {
      await createBlog({
        title: "Test Blog 1",
        content: "This is a test blog post containing the word search",
        createdBy: "Test User"
      });
      await createBlog({
        title: "Test Blog 2",
        content: "This is a test blog post",
        createdBy: "Test User"
      });
      const blogs = await searchBlog("search");
      expect(blogs?.length).toBe(1);
      expect(blogs[0].title).toBe("Test Blog 1");
    });
  });
});
