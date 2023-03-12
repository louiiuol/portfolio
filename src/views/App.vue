<template>
	<Header />
	<Router />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Header, Router } from "@/views/layout";

export default defineComponent({
	name: "App",
	components: { Header, Router }
});
</script>

<style lang="scss">
@import "@/assets/styles/index.module.scss";
</style>
