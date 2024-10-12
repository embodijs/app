<script lang="ts">
	import FormStage from '$lib/comps/form/FormStage.svelte';
	import StageButton from '$lib/comps/form/StageButton.svelte';
	import MultistageForm from '$lib/comps/form/MultistageForm.svelte';
	import Button from '$lib/comps/input/Button.svelte';
	import InputGroup from '$lib/comps/input/InputGroup.svelte';
	import Label from '$lib/comps/input/Label.svelte';
	import Textarea from '$lib/comps/input/Textarea.svelte';
	import TextInput from '$lib/comps/input/TextInput.svelte';
	import { ChooseRepo } from '$lib/comps/project';
	import { setPartial } from '$lib/helpers/store';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { createSchema } from '$def/project';
	import type { GitRepo } from '$def/git';

	export let data: PageData;

	const sf = superForm(data.superForm, {
		dataType: 'json',
		validators: valibot(createSchema)
	});
	const { form, errors } = sf;
	errors.subscribe((err) => console.log(err));
	$form.owner = data.user.username;

	const handleCreateNew = () => {
		form.update(
			setPartial({
				refId: '',
				branch: 'main',
				path: '/'
			})
		);
	};

	const handleFromRepo = (event: CustomEvent<GitRepo>) => {
		const { defaultBranch, id, activePage, name, owner } = event.detail;
		form.update(
			setPartial({
				repo: name,
				owner: owner,
				repoId: id.toString(),
				branch: defaultBranch,
				path: '/',
				activePage
			})
		);
	};
</script>

<MultistageForm super={sf}>
	<FormStage to={20}>
		<ChooseRepo
			selected={$form.repoId}
			repos={data.repos}
			on:new={handleCreateNew}
			on:select={handleFromRepo}
		/>
	</FormStage>
	<FormStage to={50}>
		<InputGroup let:id>
			<TextInput {id} name="repo" bind:value={$form.repo} />
			<Label>Repo Name</Label>
		</InputGroup>
		<Textarea name="repoDescription">Description</Textarea>
		<TextInput name="owner" bind:value={$form.owner} readonly />
		<StageButton to={0} previous>Previous</StageButton>
		<StageButton to={50}>Next</StageButton>
	</FormStage>
	<FormStage to={100}>
		<InputGroup let:id>
			<TextInput {id} name="repoId" value={$form.repoId} readonly={$form.repoId !== ''} />
			<Label>Repository</Label>
		</InputGroup>
		<InputGroup let:id>
			<TextInput {id} name="name" bind:value={$form.name} />
			<Label>Project Name</Label>
		</InputGroup>
		<InputGroup let:id>
			<TextInput {id} name="url" bind:value={$form.url} />
			<Label>URL</Label>
		</InputGroup>
		<StageButton to={0} previous>Previous</StageButton>
		<Button type="submit">Save</Button>
	</FormStage>
</MultistageForm>
