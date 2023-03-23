// @ts-nocheck
import { useEffect, useState } from 'react';
import { pipe, map, range, toArray, size, isEmpty, nth } from '@fxts/core';
import { FixedSizeList } from 'react-window';

const getFont = async () => {
  const font = new FontFace('Noto Sans', "url('https://res.kurly.com/fonts/NotoSansKR-Light.woff2')", {
    weight: 300,
    style: 'normal',
  });
  await font.load();
  return font;
};

interface UnicodeItem {
  code: number;
  char: string;
}
const FontPage = () => {
  const [unicodeRangeArr, setUnicodeRangeArr] = useState<UnicodeItem[]>([]);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    (async () => {
      const font = await getFont();
      const rangeText = font.unicodeRange.replace(/^(U+)/, '');
      const [start, end] = pipe(
        rangeText.split('-') as string[],
        map((text) => parseInt(text, 16)),
        toArray,
      );

      const result = pipe(
        range(start, end),
        map((code) => ({
          code,
          char: String.fromCharCode(code),
        })),
        toArray,
      );

      setUnicodeRangeArr(result);
    })();
  }, []);
  console.log(unicodeRangeArr);
  const Row = ({ index, style }) => {
    const { code, char } = nth(index, unicodeRangeArr);
    return <div style={style}>{`[${code}] : ${char}`}</div>;
  };

  return (
    <div>
      {!isEmpty(unicodeRangeArr) ? (
        <FixedSizeList itemSize={35} height={500} itemCount={size(unicodeRangeArr)} width={500}>
          {Row}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

export default FontPage;
