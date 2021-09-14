import { createReducer } from "typesafe-actions";
import { FetchingStatus, News } from "../../../types";
import { produce } from 'immer';
import { NewsAction } from "../actions/types";
import { fetchGetNewsAsync } from "../actions/getNewsActions";
import { deleteNews } from "../actions/deleteNewsActions";

export interface NewsState{
	news: News[];
	deletedNews: string[];
	fetchingStatus: FetchingStatus;
}

const initialNewsState: NewsState = {
  news: [],
	deletedNews: [],
	fetchingStatus: {
		loading: false,
		error: false,
		success: false,
		errorInfo: null
	}
}

const newsReducer = createReducer<NewsState, NewsAction>(initialNewsState)
.handleAction(fetchGetNewsAsync.request, state => 
	produce(state, (draft: NewsState) => {
		draft.fetchingStatus = {
			loading: true,
			error: false,
			success: false,
			errorInfo: null
		}
	})
)
.handleAction(fetchGetNewsAsync.success, (state, action) => 
	produce(state, (draft: NewsState) => {
		draft.news = action.payload,
		draft.fetchingStatus = {
			loading: false,
			error: false,
			success: true,
			errorInfo: null
		}
	})
)
.handleAction(fetchGetNewsAsync.failure, (state, action) => 
	produce(state, (draft: NewsState) => {
		draft.fetchingStatus = {
			loading: false,
			error: true,
			success: false,
			errorInfo: action.payload
		}
	})
)
.handleAction(deleteNews, (state, action) =>
	produce(state, (draft: NewsState) => {
		draft.deletedNews.push(action.payload)
		const index = draft.news.findIndex(item => item.objectID === action.payload)
    if (index !== -1) draft.news.splice(index, 1)
	})
)

export default newsReducer;