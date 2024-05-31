import request from '@/utils/request';

export const Auth = {
    state: () => ({
        userInfo: null
    }),
    getters: {},
    mutations: {
        SET_USER_INFO: (state, payload) => {
            state.userInfo = payload;
        }
    },
    actions: {
        Login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .post('/auth/local', { ...payload })
                    .then((res) => {
                        if(res.jwt) localStorage.setItem('token', res.jwt)
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getUserMe({ commit }) {
            return new Promise((resolve, reject) => {
                request
                    .get('/users/me')
                    .then((res) => {
                        resolve(res);
                        commit('SET_USER_INFO', res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }
};
