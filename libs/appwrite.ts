import { Client, Databases, Account } from "react-native-appwrite";

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('673fb35f00308b078cf5')
    .setPlatform('fr.istic.freechantier');

export const account = new Account(client);
export const databases = new Databases(client);
