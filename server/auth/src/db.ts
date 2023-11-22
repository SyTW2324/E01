import { MongoClient, ServerApiVersion } from 'mongodb';
import * as fs from 'fs';

const fileRoute: string = '../config/db.json'

export function GetDBURI(configFileRoute: string) {
  fs.readFile(fileRoute, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
      console.log('Contenido del archivo JSON:', jsonData);
      return jsonData;
    } catch (jsonErr) {
      console.error('Error al analizar el archivo JSON:', jsonErr);
    }
  });
}
