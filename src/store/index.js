import { createStore } from 'vuex';

export default createStore({
	state : {
		lightTheme : true,
	},
	mutations: {
		setThemeVisual(state) {
			!state.lightTheme
			? document.querySelector('html').classList.add('theme-dark')
			: document.querySelector('html').classList.remove('theme-dark');

			localStorage.setItem('lightTheme', state.lightTheme);
		},
		changeTheme(state) {
			state.lightTheme = !state.lightTheme;
		},
		getThemeFromLS(state) {
      let lightTheme = JSON.parse(localStorage.getItem('lightTheme'));

      state.lightTheme = lightTheme;
    },
	},
	actions: {

	}
});
