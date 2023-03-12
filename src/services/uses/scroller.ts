import { onMounted, onUnmounted } from "vue";
import { RouteRecordName } from "vue-router";
import router from "@/services/router";
import antiSpam from "./no-spam";
import useFinder from "./finder";

interface Route {
	name: RouteRecordName | undefined;
	path: string;
}

const routes: Route[] = router
	.getRoutes()
	.map(el => ({ name: el.name, path: el.path }));

/**
 * Resolve next index depending on current and
 * its positions in routes array (first, last)
 * @param e wheel event
 * @param currentIndex corresponding to the current route
 * @returns {number} next route's index for navigation
 */
const getNextIndex = function(e: WheelEvent, currentIndex: number): number {
	const isScrollingUp = Math.sign(e.deltaY) !== 1,
		isFirst = currentIndex === 0,
		isLast = currentIndex === routes.length - 1;

	return isScrollingUp
		? isFirst
			? routes.length - 1 // to last el
			: currentIndex - 1 // to previsous el
		: isLast
		? 0 // to first el
		: currentIndex + 1; // to next el
};

/**
 * uses Vue-router to navigate to next url depending on given current route
 * @param e wheel event
 * @param currentRoute name of the current route viewed
 */
const navigate = function(e: WheelEvent, currentRoute: string): void {
	const currentIndex = useFinder(routes).findIndexBy("name", currentRoute);
	if (currentIndex !== -1) {
		const nextPath = routes[getNextIndex(e, currentIndex)].path;
		router.replace(nextPath);
	}
};

const scroll = function(e: WheelEvent): void {
	antiSpam(() => {
		const currentRoute = router.currentRoute.value.name?.toString();
		if (currentRoute) {
			navigate(e, currentRoute);
		} else {
			console.error("no routes matching: ", currentRoute);
		}
	});
};

/**
 * add & remove a 'scroll based navigation' to vue component hooks (mounted & unmounted)
 */
export default function useScroll(): void {
	onMounted(() => window.addEventListener("wheel", scroll));
	onUnmounted(() => window.removeEventListener("wheel", scroll));
}
