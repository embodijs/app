<script lang="ts">
	import InputGroup from '$lib/comps/input/InputGroup.svelte';
	import Label from '$lib/comps/input/Label.svelte';
	import TextInput from '$lib/comps/input/TextInput.svelte';
	import { ChooseRepo } from '$lib/comps/project';
	import { setPartial } from '$lib/helpers/store';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;
	console.log(data.repos);

	const { form, enhance } = superForm(data.superForm);
	form.subscribe(console.log);

	const handleCreateNew = () => {
		form.update(
			setPartial({
				refId: -1,
				branch: 'main',
				path: '/'
			})
		);
	};

	const handleFromRepo = (
		event: CustomEvent<{ full_name: string; name: string; id: number; default_branch: string }>
	) => {
		form.update(
			setPartial({
				refId: event.detail.id,
				name: event.detail.full_name,
				branch: event.detail.default_branch,
				path: '/'
			})
		);
	};
</script>

{#if $form.refId == null || $form.refId === 0}
	<form on:submit|preventDefault>
		<ChooseRepo repos={data.repos} on:new={handleCreateNew} on:select={handleFromRepo} />
	</form>
{:else}
	<form method="POST" use:enhance>
		<InputGroup let:id>
			<Label>Repository</Label>
			<TextInput {id} name="repo" value={$form.name} disabled={$form.refId > 0} />
		</InputGroup>
		<InputGroup let:id>
			<Label>Project Name</Label>
			<TextInput {id} name="displayName" bind:value={$form.displayName} />
		</InputGroup>
		<InputGroup let:id>
			<Label>https://</Label>
			<TextInput {id} name="url" bind:value={$form.url} />
		</InputGroup>
	</form>
{/if}
