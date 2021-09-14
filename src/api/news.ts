import axios from 'axios'

export const getNews = () => {
	return axios({
    method: 'get',
    url: `https://hn.algolia.com/api/v1/search_by_date?tags=story`,
  })
	.then(response => {
		if(response.status === 200) {
			return response.data;
		}
	})
}