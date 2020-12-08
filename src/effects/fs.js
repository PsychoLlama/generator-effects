import fs from 'fs';
import { usingCallback } from './adapters';

export const readdir = usingCallback(fs.readdir);
export const mkdir = usingCallback(fs.mkdir);
export const readFile = usingCallback(fs.readFile);
export const writeFile = usingCallback(fs.writeFile);
