<template>
	<Container id="about" class="has-space justify-evenly items-start">
		<header class="beige">
			<Typist toType="about.title" tag="h1" :infinite="true" />
		</header>
	</Container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Container, Typist } from "@/views/shared";

export default defineComponent({
	name: "About",
	components: { Container, Typist }
});
</script>
