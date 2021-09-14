import {call, delay, put, race, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {fetchGetNewsAsync} from '../actions/getNewsActions'
import { getNews } from '../../../api/news'

export function* fetchNewsSaga() {
	try {
		const {response} = yield race({
			response: call(getNews),
			cancel: take(fetchGetNewsAsync.cancel),
			failed: take(fetchGetNewsAsync.failure),
			timeout: delay(10000)
		});
		if(response.hits) {
			yield put(fetchGetNewsAsync.success(response.hits));
		}
	}
	catch (error) {
		console.log(error)
	}
}

export default function* root() {
	yield takeLatest(
		fetchGetNewsAsync.request,
		fetchNewsSaga
	);
};