<script lang="ts">
	export let value: unknown;
	export let name: string;
</script>

<input hidden {value} {name} {...$$restProps} />
