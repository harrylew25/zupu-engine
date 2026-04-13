import { describe, expect, it } from 'vitest';
import { dictionary } from '../src/dictionary.js';
import type { RelationStep } from '../src/types/index.js';
import { ZupuEngine } from '../src/zupuEngine.js';

describe('ZupuEngine', () => {
  const engine = new ZupuEngine(dictionary, 'm');

  it('should resolve base relations correctly', () => {
    const res = engine.resolve([{ rel: 'f' }]);
    expect(res.title).toBe('父亲');
    expect(res.generation).toBe(1);
  });

  it('should resolve multi-step rules', () => {
    const res = engine.resolve([{ rel: 'w' }, { rel: 'h' }]);
    expect(res.title).toBe('丈夫');
    expect(res.generation).toBe(0);
  });

  it('should resolve paternal and maternal grandparents', () => {
    const paternalGF = engine.resolve([{ rel: 'f' }, { rel: 'f' }]);
    expect(paternalGF.title).toBe('祖父');
    expect(paternalGF.generation).toBe(2);

    const maternalGM = engine.resolve([{ rel: 'm' }, { rel: 'm' }]);
    expect(maternalGM.title).toBe('外婆');
    expect(maternalGM.generation).toBe(2);
  });

  it('should apply seniority correctly (e.g., 2nd uncle)', () => {
    const res = engine.resolve([
      { rel: 'w' },
      { rel: 'h' },
      { rel: 'f' },
      { rel: 'lb', index: 2 },
    ]);
    expect(res.title).toBe('二叔');
  });

  it('should detect Shu (polygamy) status', () => {
    const res = engine.resolve([
      { rel: 'w', index: 3 },
      { rel: 'h' },
      { rel: 'f' },
    ]);
    expect(res.lineageStatus).toBe('Shu');
    expect(res.title).toContain('庶');
  });

  it('should handle "Deep Lineage" for long paths (>10 steps)', () => {
    const deepPath: RelationStep[] = [
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'lb' },
      { rel: 'w' },
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
    ];

    const res = engine.resolve(deepPath);
    expect(res.title).toBe('第12代后裔');
  });

  it('should return "远亲" for moderately long paths that miss rules', () => {
    const res = engine.resolve([
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
      { rel: 'f' },
    ]);
    expect(res.title).toBe('远亲');
  });
});
