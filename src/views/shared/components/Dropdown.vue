<template>
	<li class="dropdown-container">
		<span class="link" @click="isToggled = !isToggled">
			{{ name }}
		</span>
		<div v-if="isToggled" class="dropdown" v-click-away="toggle">
			<ul class="links">
				<li v-for="link in links" :key="link">
					<router-link @click="toggle" class="link" :to="'/' + link">
						{{ $t("nav." + link) }}
					</router-link>
				</li>
			</ul>
		</div>
	</li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToggler } from "@/services/uses";

export default defineComponent({
	name: "Dropdown",
	props: {
		name: { type: String, required: true },
		links: { type: Array, required: true }
	},
	setup() {
		const { isToggled, toggle } = useToggler();
		return { isToggled, toggle };
	}
});
</script>

<style lang="scss" scoped>
.dropdown-container {
	position: relative;
	.dropdown {
		position: absolute;
		top: ($nav-height) + 15px;
		right: 0;
		width: max-content;
		padding: 5px;
		border-radius: $radius-sm;
		@include shadowed(true);
		background: white;
		ul.links {
			flex-direction: column !important;
		}
		li {
			width: 100%;
		}
	}
}
</style>
