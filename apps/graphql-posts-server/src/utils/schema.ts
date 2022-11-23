import * as path from 'path';
import * as fs from 'fs';

export const typeDefs = fs.readFileSync(path.resolve(__dirname,'schema.graphql')).toString(); 
