const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');


const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/buchladen')
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('Fehler:', err));

const buchSchema = new mongoose.Schema({
  titel: { type: String, required: true },
  autor: { type: String, required: true },
  erscheinungsjahr: Number,
  beschreibung: String
});
const Buch = mongoose.model('Buch', buchSchema);

const typeDefs = `
  type Buch {
    id: ID
    titel: String
    autor: String
    erscheinungsjahr: Int
    beschreibung: String
  }

  type Query {
    buecher: [Buch]
    buch(id: ID): Buch
  }

  type Mutation {
    buchHinzufuegen(titel: String, autor: String, erscheinungsjahr: Int, beschreibung: String): Buch,
    buchLoeschen(id: ID): Buch,
    buchaendern(id: ID, titel: String, autor: String, erscheinungsjahr: Int, beschreibung: String): Buch
  }


`;
const resolvers = {
  Query: {
    buecher: async () => {
      return await Buch.find();
    }
  },

  Mutation: {
    buchHinzufuegen: async (_, { titel, autor, erscheinungsjahr, beschreibung  }) => {
      return await Buch.create({ titel, autor, erscheinungsjahr, beschreibung  });
    },

    buchLoeschen: async (_, { id }) => {
      return await Buch.findByIdAndDelete(id);
    },
    buchaendern: async (_, { id, titel, autor, erscheinungsjahr, beschreibung })=>{
        return await Buch.findByIdAndUpdate(id,{titel,autor, erscheinungsjahr,beschreibung},{new:true})
    }
  }

};

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  
  app.use('/graphql', expressMiddleware(server));

  app.listen(3000, () => console.log('Server läuft auf Port 3000'));
    }

start().catch(err => console.error('Fehler:', err));
