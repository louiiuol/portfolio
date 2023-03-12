import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// generates routes as a separate chunk which is lazy-loaded when visited
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/pages/Home.vue")
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/pages/About.vue")
	}
];

export default createRouter({
	history: createWebHashHistory(),
	routes
});
