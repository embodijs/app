<script lang="ts">
	type ButtonType = "primary" | "secondary" | "ghost" | "danger" | "warning" | "success";
	export let type: ButtonType  = "primary";
</script>

<button class="{type}" {...$$restProps}>
	<slot></slot>
</button>

<style>
	button {
		border: none;
		@apply text-base font-semibold px-4 py-2 m-2 rounded-md;
		cursor: pointer;
	}
	.primary {
		background-color: var(--color-primary-700);
		color: white;
	}
	.secondary {
		background-color: var(--secondary);
		color: white;
	}
	.ghost {
		background-color: transparent;
		color: var(--color-primary-700);
	}
	.danger {
		background-color: var(--danger);
		color: white;
	}
	.warning {
		background-color: var(--warning);
		color: white;
	}
	.success {
		background-color: var(--success);
		color: white;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
