import {ApolloClient, InMemoryCache, HttpLink} from "@apollo/client";

const httpLink = new HttpLink({
    url: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;