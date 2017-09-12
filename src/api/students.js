import fetch from 'utils/fetch';

export function fetchStudentList(query) {
  return fetch({
    url:'/student',
    method:'get',
    params: query
  })
}
export function deleteStudent(studentId) {
  return fetch({
    url:'/student/'+studentId,
    method:'delete'
  })
}

export function createStudent(student) {
  return fetch({
    url:'/student',
    method:'post',
    data:student
  })
}

export function updateStudent(student) {
  return fetch({
    url:'/student',
    method:'put',
    data:student
  })
}

export function deleteStudentBatch(studentIds) {
  return fetch({
    url:'/student/deleteWithIdArray',
    method:'delete',
    data:studentIds
  })
}

export function markStudent(studentIds) {
  return fetch({
    url:'/student/markStudentsWithArray',
    method:'put',
    data:studentIds
  })
}

export function unMakrStudent(studentIds) {
  return fetch({
    url:'/student/unMarkStudentWithArray',
    method:'put',
    data:studentIds
  })
}
