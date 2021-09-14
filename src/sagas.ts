import { all } from 'redux-saga/effects';
import getNewsSagas from './screens/home/sagas/getNewsSagas';
export default function* rootSaga() {
	yield all([
		getNewsSagas()
	]);
};