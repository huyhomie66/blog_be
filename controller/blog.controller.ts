import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CreateBlogParams {
  title: string;
  content: string;
  createdBy: string;
}

interface UpdateBlogParams {
  id: string;
  title: string;
  content: string;
}

const createBlog = async (params: CreateBlogParams) => {
  const { title, content, createdBy } = params;
  const blog = await prisma.blog.create({
    data: {
      createdBy,
      title,
      content
    }
  });
  return blog;
};

const updateBlog = async (params: UpdateBlogParams) => {
  const { title, content, id } = params;
  const blog = await prisma.blog.update({
    where: { id },
    data: { title, content }
  });
  return blog;
};

const getBlogs = async () => {
  const blogs = await prisma.blog.findMany();
  return blogs;
};

const getById = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id: id }
  });
  return blog;
};

const searchBlog = async (searchQuery: string) => {
  const blogs = await prisma.blog.findMany({
    where: { content: { contains: searchQuery as string } }
  });
  return blogs
};

const searchFullText = async (searchQuery: string) => {
  const blogs = await prisma.blog.findMany({
    where: {
      OR: [
        { title: { contains: searchQuery as string } },
        { content: { contains: searchQuery as string } }
      ]
    },
    orderBy: { createdAt: "desc" }
  });
  return blogs;
};

export {
  updateBlog,
  searchFullText,
  createBlog,
  getBlogs,
  getById,
  searchBlog
};
