import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { Profiler, ProfilerOnRenderCallback } from 'react';

import { LoadingSpinner } from '@/src/components/LoadingSpinner';
import { LottieLoadingSpinner } from '@/src/components/LottieLoadingSpinner';
import { Row } from '@/src/components/Row';
import { addBenchmarkResult } from '@/src/store/slices/benchmark';
import { ProfilerResult } from '@/src/components/ProfilerResult';

const Home = () => {
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
    <>
      <main>
        <h1>Links..</h1>
        <section>
          <h2>lottie vs simple SVG</h2>
          <article>
            <h3>Overview</h3>
            <Row>
              <Profiler id="LottieLoadingSpinner" onRender={handleProfilerRender}>
                <LottieLoadingSpinner />
              </Profiler>
              <ProfilerResult id="LottieLoadingSpinner" />
            </Row>
            <Row>
              <Profiler id="LoadingSpinner" onRender={handleProfilerRender}>
                <LoadingSpinner />
              </Profiler>
              <ProfilerResult id="LoadingSpinner" />
            </Row>
          </article>
          <article>
            <h2>Benchmarks</h2>
            <ul>
              <li>
                <Link href="/benchmark/lottie">react-lottie-player</Link>
              </li>
              <li>
                <Link href="/benchmark/svg">svg loading spinner</Link>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
