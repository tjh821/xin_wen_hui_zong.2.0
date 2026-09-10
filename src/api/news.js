import axios from 'axios'

export function getEmployeeList(params) {
  return axios({
    method: 'GET',
    url: 'https://xinwen-backend-production.up.railway.app/news/page',
    params: {
      pageNum: params.page,
      pageSize: params.pageSize
    }
  })
}