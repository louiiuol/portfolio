<template>
	<main class="container">
		<slot></slot>
	</main>
</template>

<style lang="scss" scoped>
main.container {
	@include sized($window-width, $main-container-height);
	@include overflow-y;
	display: flex;
	&.has-space {
		padding: $pad-lg;
	}
	&.rows {
		flex-direction: column;
	}
	&.wrap {
		flex-wrap: wrap;
	}
	&.justify {
		&-start {
			justify-content: flex-start;
		}
		&-end {
			justify-content: flex-end;
		}
		&-evenly {
			justify-content: space-evenly;
		}
		&-around {
			justify-content: space-around;
		}
		&-center {
			justify-content: center;
		}
		&-between {
			justify-content: space-between;
		}
	}
	&.items {
		&-start {
			align-items: flex-start;
		}
		&-end {
			align-items: flex-end;
		}
		&-center {
			align-items: center;
		}
		&-stretch {
			align-items: stretch;
		}
	}
	&.content {
		&-start {
			align-content: flex-start;
		}
		&-end {
			align-content: flex-end;
		}
		&-around {
			align-content: space-around;
		}
		&-center {
			align-content: center;
		}
		&-between {
			align-content: space-between;
		}
		&-stretch {
			align-items: strecth;
		}
	}
}
</style>
