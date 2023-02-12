import { createSlice } from '@reduxjs/toolkit';
import type { ProfilerOnRenderCallback } from 'react';

// type ProfileResultSchedulerInteraction = Parameters<ProfilerOnRenderCallback>[6];
// type ProfilerResult = Exclude<Parameters<ProfilerOnRenderCallback>, ProfileResultSchedulerInteraction>;

type ProfilerResultParams = Parameters<ProfilerOnRenderCallback>;

type ProfilerResult = [
  ProfilerResultParams[0],
  ProfilerResultParams[1],
  ProfilerResultParams[2],
  ProfilerResultParams[3],
  ProfilerResultParams[4],
  ProfilerResultParams[5],
];

export interface BenchmarkState {
  [id: string]: {
    [phase: string]: ProfilerResult[];
  };
}

const initialState: BenchmarkState = {};

const { actions, reducer } = createSlice({
  name: 'benchmark',
  initialState,
  reducers: {
    addBenchmarkResult(state, { payload }: { payload: ProfilerResult }) {
      const [id, phase] = payload;
      const targetBenchmark = state[id];
      if (!targetBenchmark) {
        return {
          ...state,
          [id]: {
            [phase]: [[...payload]],
          },
        };
      }
      if (!targetBenchmark[phase]) {
        return {
          ...state,
          [id]: {
            ...targetBenchmark,
            [phase]: [[...payload]],
          },
        };
      }
      return {
        ...state,
        [id]: {
          ...targetBenchmark,
          [phase]: [...targetBenchmark[phase], [...payload]],
        },
      };
    },
  },
});

export const { addBenchmarkResult } = actions;

export default reducer;
