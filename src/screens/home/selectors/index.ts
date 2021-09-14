import {createSelector} from 'reselect'
import {RootState} from '../../../reducers'
import { News } from '../../../types'

const getNews = (state: RootState) => {
  return state.news.news
}

const getDeletedNews = (state: RootState) => {
  return state.news.deletedNews
}

const selectNewsSortByPostDate = (news: News[], deletedNews: string[]) => {
  const tempNews = news.filter((currentNew) => {
      return !deletedNews.includes(currentNew.objectID);
  });
  return tempNews.sort((a,b) => {
    if(a.created_at_i > b.created_at_i) {
      return -1
    }
    else if(a.created_at_i < b.created_at_i) {
      return 1
    }
    else return 0
  });
}

export const getNewsSortByPostDate = createSelector(
  getNews,
  getDeletedNews,
  selectNewsSortByPostDate
)

