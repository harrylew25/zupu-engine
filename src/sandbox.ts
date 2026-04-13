import { ZupuEngine } from './zupuEngine.js';
import { dictionary } from './dictionary.js';
import { RelationStep } from './types/index.js';

const engine = new ZupuEngine(dictionary, 'm');

const complexPath: RelationStep[] = [
  { rel: 'w' },
  { rel: 'h' },
  { rel: 'f' },
  { rel: 'lb' },
  { rel: 'd' },
  { rel: 's' },
];

console.log('--- Zupu Engine Local Test ---');
console.log(engine.resolve(complexPath));

