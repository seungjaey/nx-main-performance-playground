import { ProfilerResult } from '@/src/components/ProfilerResult';
import { Profiler, ProfilerOnRenderCallback } from 'react';
import { map, pipe, range, take, toArray } from '@fxts/core';
import TestImages from '@/src/constants/TestImages.json';
import { useDispatch } from 'react-redux';
import { addBenchmarkResult } from '@/src/store/slices/benchmark';
import { MotionProductCard } from '@/src/components/MotionProductCard';
import { Row } from '@/src/components/Row';

const ProductCardBenchmarkPage = () => {
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
      <Row style={{ flexWrap: 'wrap' }}>
        {pipe(
          range(Infinity),
          map((i) => (
            <Row key={i}>
              <Profiler id={`motion-product-card-${i}`} onRender={handleProfilerRender}>
                <MotionProductCard />
              </Profiler>
              <ProfilerResult id={`motion-product-card-${i}`} />
            </Row>
          )),
          take(100),
          toArray,
        )}
      </Row>
    </main>
  );
};

export default ProductCardBenchmarkPage;
