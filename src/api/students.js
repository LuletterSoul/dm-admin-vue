import fetch from 'utils/fetch';

export function fetchStudentList(query) {
  return fetch({
    url:'/students',
    method:'get',
    params: query
  })
}

export function createStudent(student) {
  return fetch({
    url:'/students',
    method:'post',
    data:student
  })
}

export function updateStudent(student) {
  return fetch({
    url:'/students',
    method:'put',
    data:student
  })
}

export function deleteStudentBatch(studentIds) {
  return fetch({
    url:'/students',
    method:'delete',
    data:studentIds
  })
}

export function markStudent(studentIds) {
  return fetch({
    url:'/students/markStudentsWithArray',
    method:'put',
    data:studentIds
  })
}

export function unMakrStudent(studentIds) {
  return fetch({
    url:'/students/unMarkStudentWithArray',
    method:'put',
    data:studentIds
  })
}
