import fetch from 'utils/fetch';

export function fetchDataSetList(query) {
  return fetch({
    url:'/dataSet',
    method:'get',
    params: query
  })
}

export function deleteDataSet(dataSetId) {
  return fetch({
    url:'/dataSet/'+dataSetId,
    method:'delete'
  })
}

export function createDataSet(dataSet) {
  return fetch({
    url:'/dataSet',
    method:'post',
    data:dataSet
  })
}

export function updateDataSet(dataSet) {
  return fetch({
    url:'/dataSet',
    method:'put',
    data:dataSet
  })
}

export function deleteDataSetsBatch(dataSetIds) {
  return fetch({
    url:'/dataSet/deleteWithIdArray',
    method:'delete',
    data:dataSetIds
  })
}
