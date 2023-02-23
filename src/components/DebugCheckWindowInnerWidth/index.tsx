import { useWindowInnerWidth } from '@/src/hooks/useWindowInnerWidth';
import { useUserAgent } from '@/src/hooks/useUserAgent';
import { useWebview } from '@/src/contexts/EnvProvider';

export const DebugCheckWindowInnerWidth = () => {
  const innerWidth = useWindowInnerWidth();
  const userAgent = useUserAgent();
  const isWebview = useWebview();
  return (
    <ul>
      <li>{innerWidth}</li>
      <li>{userAgent}</li>
      <li>{isWebview ? 'T' : 'F'}</li>
    </ul>
  );
};
