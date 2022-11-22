import path from 'path';
import fs from 'fs';

const schemaText = fs.readFileSync(path.resolve(__dirname, 'schema.graphql')).toString(); 

export default schemaText;