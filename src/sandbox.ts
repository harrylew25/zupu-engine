import { dictionary } from './dictionary.js';
import type { RelationStep } from './types/index.js';
import { ZupuEngine } from './zupuEngine.js';

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
