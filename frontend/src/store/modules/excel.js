import axios from "axios";
import drf from "@/api/drf";
import router from "@/router";

export default {
  state: {
    applicants: [],
    applicant: {},
    raters: [],
    rater: {},
    evalSheet: [],
    grades: [],
    scores: [],
    texts: [],
    currentApplicant: {},
  },

  getters: {
    applicants: (state) => state.applicants,
    applicant: (state) => state.applicant,
    raters: (state) => state.raters,
    rater: (state) => state.rater,
    evalSheet: (state) => state.evalSheet,
    grades: (state) => state.grades,
    scores: (state) => state.scores,
    texts: (state) => state.texts,
    currentApplicant: (state) => state.currentApplicant,
  },

  mutations: {
    SET_APPLICANTS: (state, applicants) => (state.applicants = applicants),
    SET_APPLICANT: (state, applicant) => (state.applicant = applicant),
    SET_RATERS: (state, raters) => (state.raters = raters),
    SET_RATER: (state, rater) => (state.rater = rater),
    SET_EVALSHEET: (state, evalSheet) => (state.evalSheet = evalSheet),
    SET_GRADES: (state, grades) => (state.grades = grades),
    SET_SCORES: (state, scores) => (state.scores = scores),
    SET_TEXTS: (state, texts) => (state.texts = texts),
    SET_CURRENTAPPLICANT: (state, currentApplicant) =>
      (state.currentApplicant = currentApplicant),
  },

  actions: {
    saveApplicants({ commit }, applicants) {
      commit("SET_APPLICANTS", applicants);
      localStorage.setItem("applicants", applicants);
    },
    saveApplicant({ commit }, applicant) {
      commit("SET_APPLICANT", applicant);
      localStorage.setItem("applicant", applicant);
    },
    saveRaters({ commit }, raters) {
      commit("SET_RATERS", raters);
      localStorage.setItem("raters", raters);
    },
    saveRater({ commit }, rater) {
      commit("SET_RATER", rater);
      localStorage.setItem("rater", rater);
    },
    saveEvalSheet({ commit }, evalSheet) {
      commit("SET_EVALSHEET", evalSheet);
      localStorage.setItem("evalSheet", evalSheet);
    },
    saveGrades({ commit }, grades) {
      commit("SET_GRADES", grades);
      localStorage.setItem("grades", grades);
    },
    saveScores({ commit }, scores) {
      commit("SET_SCORES", scores);
      localStorage.setItem("scores", scores);
    },
    saveTexts({ commit }, texts) {
      commit("SET_TEXTS", texts);
      localStorage.setItem("texts", texts);
    },
    removeApplicants({ commit, getters }, groupNo) {
      console.log("remove applicants" + groupNo);
      axios({
        url: drf.applicants.deleteApplicants(),
        // url: '/interview'+'/applicant'+'/delete',
        method: "delete",
        params: {
          groupNo: groupNo,
        },
        headers: getters.authHeader,
      })
        .then((res) => {
          console.log(res.data.applicantList);
          commit("SET_APPLICANTS", "");
          localStorage.setItem("applicants", "");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetchApplicants({ dispatch, getters }, groupNo) {
      console.log("fetch applicants in group" + groupNo);
      axios({
        url: drf.applicants.applicants(),
        // url: '/interview'+'/applicant'+'/group',
        method: "get",
        params: {
          groupNo: groupNo,
        },
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data.applicantList);
          dispatch("saveApplicants", res.data.applicantList);
        })

        .catch((err) => {
          console.error(err);
        });
    },
    async fetchApplicant({ commit, dispatch, getters }, applicantEmail) {
      console.log("fetch applicant!");
      console.log(applicantEmail);
      await axios({
        url: drf.applicants.applicant(),
        // url: '/interview'+'/applicant'+'/info',
        method: "get",
        params: {
          email: applicantEmail,
          groupNo: getters.groupNo,
        },
        headers: getters.authHeader,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "success") {
            console.log(res.data.applicant);
            dispatch("saveApplicant", res.data.applicant);
            commit("SET_CURRENTAPPLICANT", res.data.applicant);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetchRaters({ dispatch, getters }, userNo) {
      console.log("fetch raters");
      axios({
        url: drf.applicants.raters(userNo),
        // url: '/interview'+'/raterList/' + userNo ,
        method: "get",
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data.list);
          dispatch("saveRaters", res.data.list);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async fetchRater({ dispatch, getters }, raterNo) {
      console.log("fetch rater!");
      console.log(raterNo);
      await axios({
        url: drf.applicants.rater(raterNo),
        // url: '/interview'+'/detailRater/' + raterNo,
        method: "get",
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "OK") {
            console.log(res.data.rater);
            dispatch("saveRater", res.data.rater);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    removeRaters({ commit, getters }, userNo) {
      console.log("remove raters" + userNo);
      axios({
        url: drf.applicants.deleteRaters(userNo),
        // url: '/interview'+'/alldelete'+'/'+ userNo ,
        method: "delete",
        // params: {
        //     userNo: userNo
        // },
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data);
          commit("SET_RATERS", "");
          localStorage.setItem("raters", "");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    removeRater({ dispatch, commit, getters }, raterNo) {
      console.log("remove rater" + raterNo);
      axios({
        url: drf.applicants.deleteRater(raterNo),
        // url: '/interview'+'/delete'+'/'+raterNo ,
        method: "delete",
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data);
          commit("SET_RATER", "");
          localStorage.setItem("rater", "");
          dispatch("fetchRaters", getters.userNo);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    modifyRater({ dispatch, getters }, credentials) {
      console.log("modify rater");
      console.log(credentials);
      axios({
        url: drf.applicants.modifyRater(credentials.raterNo),
        // url: '/interview'+'/rater'+'/'+ credentials.raterNo ,
        method: "put",
        data: credentials,
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "OK") {
            console.log(res.data.modify);
            // dispatch("saveRaterRoomIdx", res.data.modify)
            dispatch("saveRater", res.data.modify);
            router.push({ name: "raterMan" });
            // router.push({name: 'meetingroom_man'})
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    modifyApplicant({ dispatch, getters }, credentials) {
      console.log("modify applicant");
      axios({
        url: drf.applicants.modifyApplicant(),
        // url: '/interview'+'/applicant'+'/modify',
        method: "put",
        data: credentials,
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "success") {
            console.log(res.data.applicant);
            dispatch("saveApplicant", res.data.applicant);
            router.push({ name: "applicant_man" });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async removeEvalSheet({ commit, getters }, groupNo) {
      console.log("remove Evaluation Sheet" + groupNo);
      await axios({
        url: drf.applicants.removeEval(),
        // url: '/score'+'/eval' +'/delete',
        method: "delete",
        params: {
          groupNo: groupNo,
        },
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          // alert('삭제가 완료되었습니다.')
          console.log(res.data);
          commit("SET_EVALSHEET", "");
          localStorage.setItem("evalSheet", "");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetchEvalSheet({ dispatch, getters }, groupNo) {
      console.log("fetch eval sheet" + groupNo);
      axios({
        url: drf.applicants.eval(),
        // url: '/score'+'/eval',
        method: "get",
        params: {
          groupNo: groupNo,
        },
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data.list);
          dispatch("saveEvalSheet", res.data.list);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 랭킹 가져오기
    fetchGrades({ dispatch, getters }, groupNo) {
      if (groupNo === "") {
        console.log("열린 면접이 없습니다.");
        return;
      }
      console.log("fetch grades!");
      axios({
        url: drf.applicants.grades(),
        // url: '/score'+'/ranking',
        method: "get",
        params: {
          groupNo: groupNo,
        },
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.ranking);
          if (res.data.message === "success") {
            console.log(res.data.ranking);
            var list = res.data.ranking;
            list.sort(function (a, b) {
              if (a.score1 + a.score2 < b.score1 + b.score2) {
                return 1;
              }
              if (a.score1 + a.score2 > b.score1 + b.score2) {
                return -1;
              }
              return 0;
            });
            for (let i = 0; i < list.length; i++) {
              list[i]["rank"] = i;
            }
            dispatch("saveGrades", list);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 문항별 점수
    fetchScores({ dispatch, getters }, applicantNo) {
      console.log("fetch score!");
      axios({
        url: drf.applicants.scores(),
        // url: '/score'+'/detail',
        method: "get",
        params: {
          applicantNo: applicantNo,
        },
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "success") {
            console.log(res.data);
            var list = res.data.scoreList;
            list.sort(function (a, b) {
              if (a.eval > b.eval) {
                return 1;
              }
              if (a.eval < b.eval) {
                return -1;
              }
              return 0;
            });
            dispatch("saveScores", list);
            dispatch("saveTexts", res.data.textList);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    download({ getters }, groupNo) {
      console.log("download score");
      axios({
        url: drf.applicants.download(),
        // url: '/score'+'/download',
        method: "get",
        params: {
          groupNo: groupNo,
          userNo: getters.userNo,
        },
        responseType: "blob",
        headers: {
          "access-token": getters.authHeader["access-token"],
        },
      })
        .then((res) => {
          // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
          const blob = new Blob([res.data]);
          // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 할 수 있습니다.
          // const blob = new Blob([this.content], {type: 'text/plain'})

          // blob을 사용해 객체 URL을 생성합니다.
          const fileObjectUrl = window.URL.createObjectURL(blob);

          // blob 객체 URL을 설정할 링크를 만듭니다.
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.style.display = "none";

          // 다운로드 파일 이름을 추출하는 함수
          const extractDownloadFilename = (res) => {
            const disposition = res.headers["content-disposition"];
            const fileName = decodeURI(disposition)
              .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
              .replace(/['"]/g, "");
            return fileName;
          };

          // 다운로드 파일 이름을 지정 할 수 있습니다.
          // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.
          link.download = extractDownloadFilename(res);

          // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
          // link.download = "sample-file.xlsx";

          // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
          document.body.appendChild(link);
          link.click();
          link.remove();

          // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
          window.URL.revokeObjectURL(fileObjectUrl);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    goRoom({ getters }, { mailList, person }) {
      axios({
        url: drf.admins.goRoom(),
        // url: '/score'+'/download',
        method: "post",
        headers: getters.authHeader,
        data: {
          userEmail: getters.email,
          list: mailList,
          person: person,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "success") {
            alert("링크메일을 성공적으로 보냈습니다.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async downloadEx({ getters }, type) {
      console.log("download example excel");
      await axios({
        url: drf.interviews.downloadEx(),
        // url: '/interview'+'/download',
        method: "get",
        params: {
          type: type,
        },
        responseType: "blob",
        headers: getters.authHeader,
      })
        .then((response) => {
          // console.log(response.data)
          // window.open('https://i7c205.p.ssafy.io/api/interview/download?type=rater', '_blank');

          // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
          const blob = new Blob([response.data]);
          // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 할 수 있습니다.
          // const blob = new Blob([this.content], {type: 'text/plain'})

          // blob을 사용해 객체 URL을 생성합니다.
          const fileObjectUrl = window.URL.createObjectURL(blob);

          // blob 객체 URL을 설정할 링크를 만듭니다.
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.style.display = "none";

          // // 다운로드 파일 이름을 추출하는 함수
          const extractDownloadFilename = (response) => {
            const disposition = response.headers["content-disposition"];
            const fileName = decodeURI(
              disposition
                .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
                .replace(/['"]/g, "")
            );
            return fileName;
          };

          // 다운로드 파일 이름을 지정 할 수 있습니다.
          // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.
          link.download = extractDownloadFilename(response);

          // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
          // link.download = "sample-file.xlsx";

          // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
          document.body.appendChild(link);
          link.click();
          link.remove();

          // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
          window.URL.revokeObjectURL(fileObjectUrl);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    removeResume({ getters }, groupNo) {
      console.log(groupNo);

      axios({
        url: drf.interviews.removeResume(),
        method: "delete",
        params: {
          groupNo: groupNo,
        },
        headers: getters.authHeader,
      })
        .then((res) => {
          console.log(res);
          console.log("removeResume axios comp");
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async downloadV({ getters }, { applicantNo }) {
      console.log("download video");
      await axios({
        url: drf.files.downloadfile(),
        // url: drf.interviews.saveurl(),
        // url: '/interview'+'/download',
        method: "get",
        params: {
          applicantNo: applicantNo,
        },
        responseType: "blob",
        headers: getters.authHeader,
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          // console.log('url: ', decodeURIComponent(applicantFile))
          // window.open(decodeURIComponent(applicantFile), '_blank');
          // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
          const blob = new Blob([res.data]);
          // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 할 수 있습니다.
          // const blob = new Blob([this.content], {type: 'text/plain'})
          // blob을 사용해 객체 URL을 생성합니다.
          const fileObjectUrl = window.URL.createObjectURL(blob);
          // blob 객체 URL을 설정할 링크를 만듭니다.
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.style.display = "none";
          // 다운로드 파일 이름을 추출하는 함수
          const extractDownloadFilename = (res) => {
            const disposition = res.headers["content-disposition"];
            const fileName = decodeURI(disposition)
              .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
              .replace(/['"]/g, "");
            return fileName;
          };
          // 다운로드 파일 이름을 지정 할 수 있습니다.
          // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.
          link.download = extractDownloadFilename(res);
          // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
          // link.download = "sample-file.xlsx";
          // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
          document.body.appendChild(link);
          link.click();
          link.remove();
          // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
          window.URL.revokeObjectURL(fileObjectUrl);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
