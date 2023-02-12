import { useAppSelector } from '@/src/store';
import { pipe, map, toArray, nth } from '@fxts/core';

interface Props {
  id: string;
}

export const ProfilerResult = ({ id }: Props) => {
  const benchmark = useAppSelector((state) => state.benchmark[id]);
  console.log(benchmark);
  if (!benchmark) {
    return <div>{`Benchmark result for '${id}' is not exist`}</div>;
  }
  return (
    <div>
      <div>
        <h3>Mount Phase</h3>
        <ul>
          {pipe(
            benchmark.mount,
            map((b) => nth(2, b)),
            toArray,
          )}
        </ul>
      </div>

      <div>
        <h3>Update Phase</h3>
        <ul>
          {pipe(
            benchmark.update,
            map((b) => nth(2, b)),
            toArray,
          )}
        </ul>
      </div>
    </div>
  );
};
