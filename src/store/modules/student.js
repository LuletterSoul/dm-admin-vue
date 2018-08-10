import { getStudentInfo } from '@/api/students';

const student = {
  state:{
    studentProfile:{
      className: '',
      grade: '',
      profession: '',
      studentId: '',
      studentName: ''
    }
  },
  mutations:{
    SET_STUDENT(state,studentProfile) {
      state.studentProfile = studentProfile;
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
  }
};
export default student;
