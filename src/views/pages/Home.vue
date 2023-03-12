<template>
	<Container id="home" class="rows justify-around">
		<Icon name="logo" />
		<Typist class="title beige fading" toType="home.title" tag="h1" />
		<router-link class="btn white fading" to="/about">
			{{ $t("home.show-more") }}
		</router-link>
	</Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon, Container, Typist } from "@/views/shared";

export default defineComponent({
	name: "Home",
	components: { Icon, Container, Typist }
});
</script>

<style lang="scss">
#home {
	svg#logo {
		height: 60vw;
		max-height: 50vh;
		@include widthCentered(80%);
	}

	a.btn {
		animation: fadeIn $transition-fastest forwards,
			pulse $transition-medium infinite;
		animation-delay: 15s;
	}
}

symbol#logo {
	filter: drop-shadow(1px 2px 4px rgba($legend-dark, 0.6));
	path {
		fill: transparent;
		@include stroke(white, 2000);
		animation: drawing $transition-slow forwards;
		@for $i from 2 to 15 {
			&:nth-child(#{$i}) {
				animation-delay: #{0.25 * $i}s;
			}
		}
	}
}
</style>
