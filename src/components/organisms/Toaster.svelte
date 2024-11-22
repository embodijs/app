<script lang="ts">
	import { Toast, type ColorVariant } from 'flowbite-svelte';
	import {
		initNotificationContext,
		NotificationType,
		type Notification
	} from '$lib/contexts/notifications';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	const notifications = initNotificationContext();

	const { children }: { children: Snippet } = $props();

	const toastColor = (notification: Notification): ColorVariant => {
		switch (notification.$type) {
			case NotificationType.error:
				return 'red';
			case NotificationType.info:
				return 'blue';
			case NotificationType.success:
				return 'green';
			case NotificationType.warning:
				return 'yellow';
			default:
				return 'primary';
		}
	};
</script>

{#snippet remixicon(type: NotificationType)}
	{#if type === NotificationType.error}
		<i class="ri-error-warning-line"></i>
	{:else if type === NotificationType.info}
		<i class="ri-check-fill"></i>
	{/if}
{/snippet}

{@render children?.()}
<div class="toaster">
	{#each $notifications as notification (notification.id)}
		<Toast dismissable={true} transition={slide} color={toastColor(notification)}>
			<svelte:fragment slot="icon">
				{@render remixicon(notification.$type)}
			</svelte:fragment>
			<p>{notification.message}</p>
		</Toast>
	{/each}
</div>

<style lang="postcss">
	div.toaster {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: theme(padding.3);
	}
</style>
