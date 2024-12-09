<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from '$core/user';
	import { NavProjectSwitch } from '$molecules';
	import {
		Avatar,
		Sidebar,
		SidebarBrand,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';

	type Props = {
		project: { name: string; id: string };
		user: User;
		hrefs: { posts: string; pages: string; projects: string };
	};

	const { project, hrefs, user }: Props = $props();
</script>

<Sidebar activeUrl={$page.url.pathname} class="left-0 top-0 z-40 h-screen">
	<SidebarWrapper class="h-full">
		<SidebarBrand
			site={{
				name: 'embodi',
				href: '/'
			}}
		/>
		<NavProjectSwitch name={project.name} href={hrefs.projects} />
		<SidebarGroup border>
			<SidebarItem label="Posts">
				<svelte:fragment slot="icon">
					<i class="ri-book-shelf-line"></i>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Pages">
				<svelte:fragment slot="icon">
					<i class="ri-pages-line"></i>
				</svelte:fragment></SidebarItem
			>
		</SidebarGroup>
		<SidebarGroup border>
			<SidebarItem label={user.name}>
				<svelte:fragment slot="icon">
					<Avatar src={user.avatar}>{user.name[0]}</Avatar>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
