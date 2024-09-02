<script lang="ts">
	type ButtonType = "primary" | "secondary" | "ghost" | "danger" | "warning" | "success";
	export let type: ButtonType  = "primary";
</script>

<button class="{type}">
	<slot></slot>
</button>

<style>
	button {
		border: none;
		border-radius: 4px;
		padding: 8px 16px;
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
</style>
