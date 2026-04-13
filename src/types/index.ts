export type RelationCode =
  | 'f'
  | 'm'
  | 'h'
  | 'w'
  | 'ob'
  | 'lb'
  | 'os'
  | 'ls'
  | 's'
  | 'd';
export type Gender = 'm' | 'f';

export interface RelationStep {
  rel: RelationCode;
  index?: number; // For "2nd Uncle" or "3rd Wife"
}

export interface RelationRule {
  gen: number;
  title: string;
}

export interface ZupuDictionary {
  base: Record<string, RelationRule>;
  rules: Record<string, RelationRule>;
}

export interface KinshipResult {
  title: string;
  pinyin: string;
  generation: number;
  lineageStatus: 'Di' | 'Shu';
  egoGenderContext: Gender;
}
