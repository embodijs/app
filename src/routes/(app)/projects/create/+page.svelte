<script lang="ts">
	import FormStage from '$lib/comps/form/FormStage.svelte';
	import StageButton from '$lib/comps/form/StageButton.svelte';
	import MultistageForm from '$lib/comps/form/MultistageForm.svelte';
	import Button from '$lib/comps/input/Button.svelte';
	import HiddenInput from '$lib/comps/input/HiddenInput.svelte';
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

	export let data: PageData;

	const sf = superForm(data.superForm, valibot(createSchema));
	const { form, errors } = sf;
	$form.owner = data.user.username;

	errors.subscribe(console.log);

	const handleCreateNew = () => {
		form.update(
			setPartial({
				refId: '',
				branch: 'main',
				path: '/'
			})
		);
	};

	const handleFromRepo = (
		event: CustomEvent<{
			full_name: string;
			name: string;
			id: number;
			default_branch: string;
			hasPages: boolean;
		}>
	) => {
		const { default_branch, id, hasPages } = event.detail;
		form.update(
			setPartial({
				repoId: id.toString(),
				branch: default_branch,
				path: '/',
				hasPages
			})
		);
	};
</script>

<MultistageForm super={sf}>
	<FormStage to={20}>
		<ChooseRepo repos={data.repos} on:new={handleCreateNew} on:select={handleFromRepo} />
	</FormStage>
	<FormStage to={50}>
		<InputGroup let:id>
			<TextInput {id} name="repo" value={$form.repo} />
			<Label>Repo Name</Label>
		</InputGroup>
		<Textarea name="repoDescription">Description</Textarea>
		<TextInput name="owner" value={$form.owner} readonly />
		<HiddenInput name="private" value={true} type="checkbox" checked />
		<StageButton to={0} previous>Previous</StageButton>
		<StageButton to={50}>Next</StageButton>
	</FormStage>
	<FormStage to={100}>
		<InputGroup let:id>
			<TextInput {id} name="repoId" value={$form.repoId} readonly={$form.repoId !== ''} />
			<Label>Repository</Label>
		</InputGroup>
		<InputGroup let:id>
			<TextInput {id} name="name" value={$form.name} />
			<Label>Project Name</Label>
		</InputGroup>
		<InputGroup let:id>
			<TextInput {id} name="url" value={$form.url} />
			<Label>URL</Label>
		</InputGroup>
		<HiddenInput name="branch" value={$form.branch} />
		<HiddenInput name="path" value={$form.path} />
		<HiddenInput name="hasPages" value={$form.hasPages} />
		<StageButton to={0} previous>Previous</StageButton>
		<Button type="submit">Save</Button>
	</FormStage>
</MultistageForm>
