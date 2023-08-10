import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { Profiler, ProfilerOnRenderCallback } from 'react';

import { LoadingSpinner } from '@/src/components/LoadingSpinner';
import { LottieLoadingSpinner } from '@/src/components/LottieLoadingSpinner';
import { Row } from '@/src/components/Row';
import { addBenchmarkResult } from '@/src/store/slices/benchmark';
import { ProfilerResult } from '@/src/components/ProfilerResult';
import { ProductCard } from '@/src/components/ProductCard';
import { MotionProductCard } from '@/src/components/MotionProductCard';

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
    <main>
      <section>
        <Link href="/sample">link 1</Link>
        <Link href={`${process.env.NEXT_PUBLIC_WEB_HOST}/sample`}>Link2</Link>
      </section>
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
          <h3></h3>
          <Row>
            <Profiler id="productCard" onRender={handleProfilerRender}>
              <ProductCard />
            </Profiler>
            <ProfilerResult id="productCard" />
          </Row>
          <Row>
            <Profiler id="motionProductCard" onRender={handleProfilerRender}>
              <MotionProductCard />
            </Profiler>
            <ProfilerResult id="motionProductCard" />
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
            <li>
              <Link href="/benchmark/image">{`<img> tag`}</Link>
            </li>
            <li>
              <Link href="/benchmark/next-image">{`<NextImage> tag`}</Link>
            </li>
            <li>
              <Link href="/components/product-card">product-card component</Link>
            </li>
            <li>
              <Link href="/components/product-card-with-framer">product-card-with-framer</Link>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default Home;
