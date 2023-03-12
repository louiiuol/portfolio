<template>
	<nav id="main-nav">
		<router-link to="/">
			<h3 class="link">L<span>ouis </span>G<span>ODLEWSKI</span></h3>
		</router-link>
		<ul class="links primary">
			<dropdown :name="$t('nav.about')" :links="links" />
			<li class="has-icon">
				<a href="mailto:louis.godlewski@gmail.com">
					<Icon name="calendar" class="sm" />
				</a>
			</li>
			<li class="has-icon">
				<Icon
					@click="changeLocale(langName.substr(0, 2))"
					:name="'flag-' + langName"
					class="sm pointed"
				/>
			</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { i18n } from "@/main";
import { Dropdown, Icon } from "@/views/shared";

export default defineComponent({
	name: "Header",
	components: { Icon, Dropdown },
	setup() {
		const links = ["about"];
		const langName = computed(() =>
			i18n.global.locale === "fr" ? "english" : "french"
		);
		const changeLocale = function(lang: string): void {
			i18n.global.locale = lang;
		};
		return { changeLocale, langName, links };
	}
});
</script>

<style lang="scss">
nav#main-nav {
	@include sized(100%, $nav-height);
	@include flex(row nowrap, space-between, center);
	@include shadowed;
	background: $white;
	color: $primary;
	padding: $pad-sides-md;
	z-index: $z-main-nav;
	h3 {
		font-size: 1.5rem;
		span {
			max-width: 0;
			transition: $transition-fast;
			display: inline-block;
			overflow: hidden;
			vertical-align: bottom;
			opacity: 0;
			margin-right: 5px;
		}
		&:hover span {
			max-width: 250px;
			opacity: 1;
		}
	}
	ul.links {
		@include flex(row nowrap, space-evenly, flex-end);
		li {
			list-style-type: none;
			height: $nav-height;
			padding: 0.7rem;
			padding-top: ($nav-height)/4;
			border-radius: $radius-xs;
			&:hover {
				background: $beige;
			}
		}
	}
}
</style>
