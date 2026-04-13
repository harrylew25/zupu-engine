import type {
  Gender,
  KinshipResult,
  RelationStep,
  ZupuDictionary,
} from './types/index.js';

export class ZupuEngine {
  constructor(
    private dictionary: ZupuDictionary,
    private egoGender: Gender = 'm',
  ) {}

  public resolve = (path: RelationStep[]): KinshipResult => {
    let currentGeneration = 0;
    let isShu = false;

    const finalTitle = path.reduce((acc, step, idx) => {
      if (step.rel === 'w' && step.index && step.index > 0) {
        isShu = true;
      }

      if (idx === 0) {
        const base = this.dictionary.base[step.rel];
        currentGeneration += base.gen;
        return base.title;
      }

      const lookup = `${acc},${step.rel}`;
      const match = this.dictionary.rules[lookup];

      if (match) {
        currentGeneration += match.gen;
        return step.index && step.index > 1
          ? this.applySeniority(match.title, step.index)
          : match.title;
      }

      return this.handleDeepLineage(path.length);
    }, '');

    return {
      title: isShu ? `庶${finalTitle}` : finalTitle,
      pinyin: '',
      generation: currentGeneration,
      lineageStatus: isShu ? 'Shu' : 'Di',
      egoGenderContext: this.egoGender,
    };
  };

  private applySeniority = (title: string, index: number): string => {
    const num =
      ['', '大', '二', '三', '四', '五', '六'][index] || index.toString();
    return title === '叔公' ? `${num}叔` : `${num}${title.slice(-1)}`;
  };

  private handleDeepLineage = (totalDepth: number): string => {
    return totalDepth >= 10 ? `第${totalDepth}代后裔` : '远亲';
  };
}
