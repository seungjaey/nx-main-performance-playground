import { useAppSelector } from '@/src/store';
import { PhaseList } from '@/src/components/ProfilerResult/PhaseList';

interface Props {
  id: string;
}

export const ProfilerResult = ({ id }: Props) => {
  const benchmark = useAppSelector((state) => state.benchmark[id]);
  if (!benchmark) {
    return <div>{`Benchmark result for '${id}' is not exist`}</div>;
  }
  return (
    <div>
      <PhaseList title="Mount Phase" list={benchmark.mount} />
      <PhaseList title="Update Phase" list={benchmark.update} />
    </div>
  );
};
