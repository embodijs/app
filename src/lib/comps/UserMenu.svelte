<script lang="ts">
	export let user: {name: string; avatar?: string};
</script>

<div>
	<div>
		<span>Hello, {user.name}</span>
		{#if user.avatar}
			<img src={user.avatar} alt={user.name} />
		{/if}
	</div>
</div>

<style>

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
	}

	span {
		padding: 0.5rem;
		font-weight: 600;
	}

	img {
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		margin-right: 0.5rem;
	}

</style>