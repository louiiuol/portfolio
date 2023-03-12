<template>
	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useScroll } from "@/services/uses";

export default defineComponent({
	name: "Router",
	setup() {
		useScroll(); // enable scrolling navigation
	}
});
</script>
