<script lang="ts">
	type ButtonType = 'primary' | 'submit' | 'reset' | 'ghost';
	export let type: ButtonType = 'primary';

	const getButtonType = (type: ButtonType) => {
		switch (type) {
			case 'reset':
			case 'submit':
				return type;
			default:
				return 'button';
		}
	};
</script>

<button class={type} {...$$restProps} type={getButtonType(type)} on:click on:dblclick>
	<slot></slot>
</button>

<style>
	button {
		border: none;
		@apply text-base font-semibold px-4 py-2 m-2 rounded-md;
		cursor: pointer;
	}
	.primary,
	.submit {
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
	.danger,
	.reset {
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
