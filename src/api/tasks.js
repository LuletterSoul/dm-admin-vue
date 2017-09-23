import fetch from 'utils/fetch';

export function fetchTaskList(query) {
  return fetch({
    url:'/tasks',
    method:'get',
    params: query
  })
}
export function deleteTask(taskId) {
  return fetch({
    url:'/tasks/'+taskId,
    method:'delete'
  })
}

export function createTask(task) {
  return fetch({
    url:'/tasks',
    method:'post',
    data:{
      task:task
    }
  })
}

export function updateTask(task) {
  return fetch({
    url:'/tasks',
    method:'put',
    data:{
      task:task
    }
  })
}

export function deleteTaskBatch(taskIds) {
  return fetch({
    url:'/tasks/deleteWithIdArray',
    method:'delete',
    data:{
      taskIds:taskIds
    }
  })
}
