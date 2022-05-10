const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {graphql} = require('graphql');
require('dotenv').config();

const typeDefs = require('./src/typedef');
const resolvers = require('./src/resolver');

// // GraphQL Code
// const typeDefs = `
// 	type Query {
// 		totalPosts: Int!
// 	}
// `;

// //resolvers
// const resolvers = {
// 	Query: {
// 		totalPosts: () => 42,
// 	},
// };

// Note that by default a GraphQL playground is enabled unless NODE_ENV=production
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

// Express Code
const app = express();

app.get('/rest', (req, res) => {
	res.json({
		data: 'API test'
	});
});

app.get('/rest2', async (req, res) => {
	const value = await apolloServer.executeOperation({
		query: `query FetchPosts {
			posts { 
				title 
				votes 
			}
		}`,
	})
	res.json(value.data);
});

/*
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
 */

async function startApolloServer() {
	// Await apolloServer.start() is mandatory for some reason
	await apolloServer.start();
	// Integrate the apollo server at /graphql
	apolloServer.applyMiddleware({ app });
}

startApolloServer();

app.listen(process.env.PORT, () => {
	console.log(`Server is running at http://localhost:${process.env.PORT}`);
});