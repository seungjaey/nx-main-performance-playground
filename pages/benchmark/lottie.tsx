import { Profiler, ProfilerOnRenderCallback } from 'react';
import { useDispatch } from 'react-redux';
import { pipe, range, map, toArray } from '@fxts/core';

import { addBenchmarkResult } from '@/src/store/slices/benchmark';
import { ProfilerResult } from '@/src/components/ProfilerResult';
import { LottieLoadingSpinner } from '@/src/components/LottieLoadingSpinner';

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
      <h1>lottie x 100</h1>
      <ProfilerResult id="BulkLottieLoadingSpinner" />
      <Profiler id="BulkLottieLoadingSpinner" onRender={handleProfilerRender}>
        {pipe(
          range(100),
          map((i) => <LottieLoadingSpinner key={i} />),
          toArray,
        )}
      </Profiler>
    </main>
  );
};

export default LottieBenchmarkPage;
