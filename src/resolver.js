//import { find, filter } from "lodash"
const { find, filter } = require("lodash");
const authors = [
    { id: 1, firstName: "Tom", lastName: "Coleman" },
    { id: 2, firstName: "Sashko", lastName: "Stubailo" },
    { id: 3, firstName: "Mikhail", lastName: "Novikov" },
]
const posts = [
    { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
    { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 },
    { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
    { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 },
]
const fakeDb = {
    Query: {
        posts: () => posts,
        post: ({id}) => {
            const post = find(posts, { id });
            return post;
        },
        authors: () => authors,
        author: (_, { id }) => {
            const author = find(authors, { id });
            author.posts = filter(posts, {authorId: author.id});
            return author;
        },
    },
    Mutation: {
        createPost: (_, newPost) => {
            // console.log("new post",newPost.post.id);
            posts.push(newPost.post)
            // console.log("posts",posts);
            let result = {
                success: true,
            }
            return result
        },
    },
}

//export default fakeDb;
module.exports = fakeDb;