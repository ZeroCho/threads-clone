import "expo-router/entry";

import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  Response,
  RestSerializer,
  Server,
  Factory,
} from "miragejs";
import { faker } from "@faker-js/faker";
import { type User } from "./app/_layout";
import * as Device from "expo-device";
declare global {
  interface Window {
    server: Server;
  }
}

let zerocho;

if (__DEV__ && !Device.isDevice) {
  if (window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    models: {
      user: Model.extend({
        posts: hasMany("post"),
        activities: hasMany("activity"),
      }),
      post: Model.extend({
        user: belongsTo("user"),
      }),
      activity: Model.extend({
        user: belongsTo("user"),
      }),
    },
    serializers: {
      post: RestSerializer.extend({
        include: ["user"],
        embed: true,
      }),
      activity: RestSerializer.extend({
        include: ["user"],
        embed: true,
      }),
    },
    factories: {
      user: Factory.extend({
        id: () => faker.person.firstName(),
        name: () => faker.person.fullName(),
        description: () => faker.lorem.sentence(),
        profileImageUrl: () =>
          `https://avatars.githubusercontent.com/u/${Math.floor(
            Math.random() * 100_000
          )}?v=4`,
        isVerified: () => Math.random() > 0.5,
      }),
      post: Factory.extend({
        id: () => faker.string.numeric(6),
        content: () => faker.lorem.paragraph(),
        imageUrls: () =>
          Array.from({ length: Math.floor(Math.random() * 3) }, () =>
            faker.image.urlLoremFlickr({ category: "nature" })
          ),
        likes: () => Math.floor(Math.random() * 100),
        comments: () => Math.floor(Math.random() * 100),
        reposts: () => Math.floor(Math.random() * 100),
      }),
    },
    seeds(server) {
      zerocho = server.create("user", {
        id: "zerohch0",
        name: "ZeroCho",
        description: "🐢 lover, programmer, youtuber",
        profileImageUrl: "https://avatars.githubusercontent.com/u/885857?v=4",
      });
      const users = server.createList("user", 10);
      users.forEach((user) => {
        server.createList("post", 5, {
          user,
        });
      });
      server.createList("post", 5, {
        user: zerocho,
      });
    },
    routes() {
      this.post("/posts", async (schema, request) => {
        const formData = request.requestBody as unknown as FormData;
        const posts: Record<string, string | string[]>[] = [];
        formData.forEach(async (value, key) => {
          const match = key.match(/posts\[(\d+)\]\[(\w+)\](\[(\d+)\])?$/);
          console.log("key", key, match, value);
          if (match) {
            const [_, index, field, , imageIndex] = match;
            const i = parseInt(index);
            const imgI = parseInt(imageIndex);
            if (!posts[i]) {
              posts[i] = {};
            }
            if (field === "imageUrls") {
              if (!posts[i].imageUrls) {
                posts[i].imageUrls = [] as string[];
              }
              (posts[i].imageUrls as string[])[imgI] = (
                value as unknown as { uri: string }
              ).uri;
            } else if (field === "location") {
              posts[i].location = JSON.parse(value as string);
            } else {
              posts[i][field] = value as string;
            }
          }
        });
        console.log("posts", posts);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        posts.forEach((post: any) => {
          schema.create("post", {
            id: post.id,
            content: post.content,
            imageUrls: post.imageUrls,
            location: post.location,
            user: schema.find("user", zerocho?.id),
          });
        });
        return posts;
      });

      this.get("/posts", (schema, request) => {
        console.log("request", request.queryParams);
        let posts = schema.all("post");
        if (request.queryParams.type === "following") {
          posts = posts.filter((post) => post.user?.id === zerocho?.id);
        }
        let targetIndex = -1;
        if (request.queryParams.cursor) {
          targetIndex = posts.models.findIndex(
            (v) => v.id === request.queryParams.cursor
          );
        }
        return posts
          .sort((a, b) => parseInt(b.id) - parseInt(a.id))
          .slice(targetIndex + 1, targetIndex + 11);
      });

      this.get("/posts/:id", (schema, request) => {
        return schema.find("post", request.params.id);
      });
      this.get("/posts/:id/comments", (schema, request) => {
        const comments = schema.all("post");
        let targetIndex = -1;
        if (request.queryParams.cursor) {
          targetIndex = comments.models.findIndex(
            (v) => v.id === request.queryParams.cursor
          );
        }
        return comments
          .sort((a, b) => parseInt(b.id) - parseInt(a.id))
          .slice(targetIndex + 1, targetIndex + 11);
      });
      this.get("/users/:id", (schema, request) => {
        console.log("request", request.params.id);
        return schema.find("user", request.params.id.slice(1));
      });

      this.get("/users/:id/:type", (schema, request) => {
        console.log("request", request.queryParams);
        let posts = schema.all("post");
        if (request.params.type === "threads") {
          posts = posts.filter((post) => post.user?.id === request.params.id);
        } else if (request.params.type === "reposts") {
          posts = posts.filter((post) => post.user?.id !== request.params.id);
        }
        let targetIndex = -1;
        if (request.queryParams.cursor) {
          targetIndex = posts.models.findIndex(
            (v) => v.id === request.queryParams.cursor
          );
        }
        return posts.slice(targetIndex + 1, targetIndex + 11);
      });

      this.post("/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        if (username === "zerocho" && password === "1234") {
          return {
            accessToken: "access-token",
            refreshToken: "refresh-token",
            user: {
              id: "zerohch0",
              name: "ZeroCho",
              description: "🐢 lover, programmer, youtuber",
              profileImageUrl:
                "https://avatars.githubusercontent.com/u/885857?v=4",
            },
          };
        } else {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
      });
    },
  });
}
