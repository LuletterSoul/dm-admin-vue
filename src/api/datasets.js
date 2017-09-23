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
    url:'/dataSets/'+dataSetId,
    method:'delete'
  })
}

export function createDataSet(dataSet) {
  return fetch({
    url:'/dataSets',
    method:'post',
    data:dataSet
  })
}

export function updateDataSet(dataSet) {
  return fetch({
    url:'/dataSets',
    method:'put',
    data:dataSet
  })
}

export function deleteDataSetsBatch(collectionIds) {
  return fetch({
    url:'/dataSets/deleteWithArray',
    method:'delete',
    data:collectionIds
  })
}
