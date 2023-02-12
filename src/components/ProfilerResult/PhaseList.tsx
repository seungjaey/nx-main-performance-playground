import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { isEmpty, nth } from '@fxts/core';
import { ProfilerResult } from '@/src/store/slices/benchmark';

const List = styled(motion.ul)`
  height: 0;
  opacity: 0;
  overflow: hidden;
`;

interface Props {
  title: string;
  list: ProfilerResult[];
}

export const PhaseList = ({ title, list }: Props) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);

  const renderList = () => {
    if (isEmpty(list)) {
      return <li>-</li>;
    }
    return list.map((item, index) => {
      const actualDuration = nth(2, item);
      return <li key={`${title}-${index}`}>{actualDuration}</li>;
    });
  };
  return (
    <div>
      <h3>
        <button type="button" onClick={handleClick}>
          {title}
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <List
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderList()}
          </List>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
