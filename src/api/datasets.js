import fetch from 'utils/fetch';
import {asyncRouterMap} from "../router/index";

const COLLECTION_BASE_PATH = "/data_sets";
const CONTAINER_BASE_PATH = '/containers';
export function fetchCollectionList(query) {
  return fetch({
    url:COLLECTION_BASE_PATH,
    method:'get',
    params: query
  })
}

export function deleteCollection(dataSetId) {
  return fetch({
    url:COLLECTION_BASE_PATH.concat('/').concat(dataSetId),
    method:'delete'
  })
}

export function createCollection(collection) {
  return fetch({
    url:COLLECTION_BASE_PATH,
    method:'post',
    data:collection
  })
}

export function getCollection(collectionId) {
  return fetch({
    url:COLLECTION_BASE_PATH.concat('/').concat(collectionId),
    method:'get'
  })
}


export async function addSet(collectionId,file,progress_uuid) {
  return fetch({
    url: COLLECTION_BASE_PATH.concat('/').concat(collectionId).concat('/containers'),
    method: 'post',
    data: file,
    params:{'proc_query_key' : progress_uuid}
  });
}

export async function getSets(collectionId,query) {
  return fetch({
    url: COLLECTION_BASE_PATH.concat("/").concat(collectionId).concat("/containers"),
    params:query,
    method:'get'
  });
}

export async function downloadSetZip(collectionId,containerIds,callback) {
  return fetch({
    url: CONTAINER_BASE_PATH.concat("/").concat("zips"),
    method: 'post',
    params:{'collectionId':collectionId},
    data:containerIds,
    responseType:'blob',
    onDownloadProgress: function (progressEvent) {
      if(progressEvent.lengthComputable){
        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        callback(progressEvent);
      }
    },
  });
}

export function updateCollection(dataSet) {
  return fetch({
    url:'/data_sets',
    method:'put',
    data:dataSet
  })
}

export function deleteCollectionsBatch(collectionIds) {
  return fetch({
    url:'/data_sets',
    method:'delete',
    data:collectionIds
  })
}

export function getDataSetContainer(containerId) {
  return fetch({
    url:'/dataSetContainers/'+containerId,
    method: 'get',
  })
}

export function createDataSetContainer(container) {
  return fetch({
    url:'/dataSetContainers',
    method:'post',
    data:container
  })
}
export function getRelFilePath(containerId) {
  return fetch({
    url:'/dataSetContainers'/+containerId+'/filePath',
    method:'get'
  })
}

export function uploadDataSetContainer(containerId,containerFile) {
  return fetch({
    url:'/dataSetContainers/'+containerId+'/uploadSetData',
    method:'post',
    headers:{"Content-Type":"multipart/form-data"},
    data: containerFile
  })
}

export function downloadContianerFile(containerId,fileParam) {
  return fetch({
    url:'/dataSetContainers/'+containerId,
    method:'get',
    params:fileParam
  })

}

export function updateDataSetContainer(container) {
  return fetch({
    url:'/dataSetContainers',
    method:'put',
    data:container
  })
}

export function deleteBatchDataSets(containerIds) {
  return fetch({
    url:CONTAINER_BASE_PATH,
    method:'delete',
    data:containerIds
  })
}

export function fetchOptions() {
  return fetch({
    url:'/options/data_set',
    method:'get',
  })
}

export function fetchScatterJson() {
  return fetch({
    baseURL:'https://ecomfe.github.io/echarts-examples',
    url:'/public/data/asset/data/life-expectancy-table.json',
    method:'get'
  })
}
