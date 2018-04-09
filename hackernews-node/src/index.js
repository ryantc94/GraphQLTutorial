
const { GraphQLServer } = require('graphql-yoga')

/*
typeDefs constant defines GraphQL schema. This defines a Query type with one field info.
The '!' means that info can never be null.
*/

/*
resolvers Object is the actual implementation of GraphQL Schema.
*/
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () =>  links,
		link: (root, args) => {
			return links[args.id]
		}
	},
	Mutation: {
		post: (root, args) => {
			const link = {
			    id: `link-${idCount++}`,
			    description: args.description,
			    url: args.url,
			}
			links.push(link)
			return link
		}
		updateLink: (root, args) => {
			links[args.id] = {
				id: `link-${args.id}`,
				url: args.url,
				description: args.description
			}
		},
		deleteLink: (root, args) => {
			links.splie(args.id, (args.id + 1))
		}
	},
}
/*
typeDefs and resolvers are bundled and passed to GraphQLServer imported from graphql-yoga
*/
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
