const axios = require('axios');

// Object types for queries
const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
} = require("graphql");

// Posts Type
const PostsType = new GraphQLObjectType({
    name: "Posts",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // To fetch all posts
        posts: {
            type: new GraphQLList(PostsType),
            resolve() {
                return axios
                    .get("https://jsonplaceholder.typicode.com/posts")
                    .then((res) => res.data);
            },
        },

        // To fetch post using ID
        post: {
            type: PostsType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios
                    .get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                    .then((res) => res.data);
            },
        },
    },
});

// Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // To add a new post
        addPost: {
            type: PostsType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                body: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return axios
                    .post("https://jsonplaceholder.typicode.com/posts", {
                        title: args.title,
                        body: args.body,
                    })
                    .then((res) => res.data);
            },
        },

        // To delete a post
        deletePost: {
            type: PostsType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return axios
                    .delete(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                    .then((res) => res.data);
            },
        },

        // To edit a post
        editPost: {
            type: PostsType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLNonNull(GraphQLString) },
                body: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return axios
                    .put(`https://jsonplaceholder.typicode.com/posts/${args.id}`, {
                        title: args.title,
                        body: args.body,
                    })
                    .then((res) => res.data);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});