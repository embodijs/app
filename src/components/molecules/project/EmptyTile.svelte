<script lang="ts">
	type Props = {
		onclick: () => void;
	};

	const { onclick }: Props = $props();
</script>

<button {onclick} class="content-tile dashed clickable border">
	<i class="ri-add-large-line"></i>
	<span>Add a new project</span>
</button>

<style>
	button {
		display: flex;
		height: 250px;
		width: 350px;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		cursor: pointer;
		color: var(--color-secondary-500);
	}

	button:hover {
		color: inherit;
	}

	button i {
		font-size: 3rem;
		padding: 0.5rem;
	}
</style>
