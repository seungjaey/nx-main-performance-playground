import { Profiler, ProfilerOnRenderCallback } from 'react';
import { useDispatch } from 'react-redux';
import { pipe, range, size, map, toArray } from '@fxts/core';

import { addBenchmarkResult } from '@/src/store/slices/benchmark';
import { ProfilerResult } from '@/src/components/ProfilerResult';

import TestImages from '@/src/constants/TestImages.json';

const LottieBenchmarkPage = () => {
  const dispatch = useDispatch();
  const handleProfilerRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) => {
    dispatch(addBenchmarkResult([id, phase, actualDuration, baseDuration, startTime, commitTime]));
  };
  return (
    <main>
      <h1>img x 100</h1>
      <ProfilerResult id="BulkImage" />
      <Profiler id="BulkImage" onRender={handleProfilerRender}>
        {pipe(
          range(size(TestImages)),
          map((i) => (
            <div key={i}>
              <img src={TestImages[i]} alt="image" style={{ width: '100px', height: '100px' }} />
            </div>
          )),
          toArray,
        )}
      </Profiler>
    </main>
  );
};

export default LottieBenchmarkPage;
