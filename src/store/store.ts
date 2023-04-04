import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import { models, RootModel } from '../models';
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading"
export const store = init({
	models,
	plugins: [immerPlugin(), loadingPlugin()]
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
