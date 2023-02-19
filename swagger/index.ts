import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API for managing blog posts"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["**/*.ts"]
};

export const specs = swaggerJSDoc(options);
