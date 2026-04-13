import type { ZupuDictionary } from './types/index.js';

export const dictionary: ZupuDictionary = {
  base: {
    w: { gen: 0, title: '妻子' },
    h: { gen: 0, title: '丈夫' },
    f: { gen: 1, title: '父亲' },
    m: { gen: 1, title: '母亲' },
    ob: { gen: 0, title: '哥哥' },
    lb: { gen: 0, title: '弟弟' },
    os: { gen: 0, title: '姐姐' },
    ls: { gen: 0, title: '妹妹' },
    s: { gen: -1, title: '儿子' },
    d: { gen: -1, title: '女儿' },
  },
  rules: {
    '妻子,h': { gen: 0, title: '丈夫' },
    '丈夫,f': { gen: 1, title: '公公' },
    '公公,lb': { gen: 0, title: '叔公' },
    '叔公,d': { gen: -1, title: '堂姑' },
    '堂姑,s': { gen: -1, title: '表姑表弟' },
    '父亲,f': { gen: 1, title: '祖父' },
    '父亲,m': { gen: 1, title: '祖母' },
    '母亲,f': { gen: 1, title: '外公' },
    '母亲,m': { gen: 1, title: '外婆' },
  },
};
