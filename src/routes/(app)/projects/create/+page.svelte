<script lang="ts">
	import { CreateProject } from '$templates';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<CreateProject form={data.superForm} repos={data.repos} />
