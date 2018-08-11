import { getStudentInfo } from '@/api/students';

const student = {
  state:{
    studentProfile:{
      className: '',
      grade: '',
      profession: '',
      studentId: '',
      studentName: '',
    },
    newStudents:[]
  },
  mutations:{
    SET_STUDENT(state,studentProfile) {
      state.studentProfile = studentProfile;
    },
    SET_NEW_STUDENTS:(state,students) =>{
      state.newStudents = students;
      console.log(state.newStudents);
    }
  },
  actions:{
    GetStuInfo({commit},state) {
      return new Promise((resolve, reject) => {
        getStudentInfo(state).then(response => {
          commit('SET_STUDENT', response);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    SetNewStudents:({commit},students) =>{
      commit('SET_NEW_STUDENTS', students);
    }
  }
};
export default student;
