import {createAsyncAction} from 'typesafe-actions'
import {AxiosError} from 'axios'
import { News } from '../../../types';

export const fetchGetNewsAsync = createAsyncAction(
	'GET_NEWS_FETCH',
	['GET_NEWS_SUCCESS', (result: News[]) => result],
	['GET_NEWS_ERROR', (err: AxiosError) => err],
	'GET_NEWS_CANCEL_FETCH'
)();