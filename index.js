import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type  Music {
    id: ID
    title: String
    artist: String
  }

  type Query {
    musics: [Music]
    music(id: ID): Music
  }
`;

const MUSICS = [
  {
    id: 1,
    title: "Cut me down (Donatello)",
    artist: "Sasha",
  },
  {
    id: 2,
    title: "Perdutto (Club mix)",
    artist: "Inspiro & Ornella Vanoni",
  },
  {
    id: 3,
    title: "Too much information - Laolu remix",
    artist: "Dele Sosimi Afrobeat Orchestra",
  },
];

const resolvers = {
  Query: {
    musics: () => {
      // Je retourne toutes les musiques
      return MUSICS;
    },
    music: (parent, args) => {
      // Je retourne une musique
      return MUSICS.find((music) => {
        if (music.id == args.id) {
          return music;
        }
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Le serveur tourne sur: ${url}`);
