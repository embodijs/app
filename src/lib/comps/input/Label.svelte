<script lang="ts">
	import { getInputGroupContext } from "./context";


	const { id, errors } = getInputGroupContext();

</script>

<label for={id} {...$$restProps}><slot /></label>