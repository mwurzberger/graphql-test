//import { gql } from "apollo-server-express"
const { gql } = require("apollo-server-express");
const typeDefs = gql`
	type Author {
		id: Int!
		firstName: String
		lastName: String
		posts: [Post]
	}
	type Post {
		id: Int!
		title: String
		authorId: ID!
		votes: Int
	}
	input PostData {
		id: Int!
		title: String
		authorId: ID!
		votes: Int
	}
	type Response {
		success: Boolean
	}
	type Query {
		posts: [Post]
        post(id: Int!): Post
        authors: [Author]
		author(id: Int!): Author
	}
	type Mutation {
		createPost(post: PostData): Response
	}
`
//export default typeDefs
module.exports = typeDefs;