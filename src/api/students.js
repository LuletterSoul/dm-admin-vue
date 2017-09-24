import fetch from 'utils/fetch';

export function fetchStudentList(query) {
  return fetch({
    url:'/students',
    method:'get',
    params: query
  })
}
export function deleteStudent(studentId) {
  return fetch({
    url:'/students/'+studentId,
    method:'delete'
  })
}

export function createStudent(student) {
  return fetch({
    url:'/students',
    method:'post',
    data:{
      student:student
    }
  })
}

export function updateStudent(student) {
  return fetch({
    url:'/students',
    method:'put',
    data:{
      student:student
    }
  })
}

export function deleteStudentBatch(studentIds) {
  return fetch({
    url:'/students/deleteWithIdArray',
    method:'delete',
    data:{
      studentIds:studentIds
    }
  })
}

export function markStudent(studentIds) {
  return fetch({
    url:'/student/markStudentsWithArray',
    method:'put',
    data:{
      studentIds:studentIds
    }
  })
}

export function unMakrStudent(studentIds) {
  return fetch({
    url:'/student/unMarkStudentWithArray',
    method:'put',
    data:{
      studentIds:studentIds
    }
  })
}
