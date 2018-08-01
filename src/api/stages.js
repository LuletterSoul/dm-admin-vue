import fetch from '@/utils/fetch';
const STAGE_BASE_PATH = '/stages';

export function createStage(stage) {
  return fetch({
    url:STAGE_BASE_PATH,
    method:'post',
    data:stage
  })
}

export function getResultsByStageId(stageId,query) {
  return fetch({
    url:STAGE_BASE_PATH.concat("/").concat(stageId),
    method:'get',
    params:query
  })
}








