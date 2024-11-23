import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { nanoid } from 'nanoid';

const key = Symbol('notification');

export enum NotificationType {
	info,
	success,
	warning,
	error
}

export type SimpleNotification = {
	$type: NotificationType;
	id: string;
	message: string;
};
export type Notification = SimpleNotification;

export type NotificationContext = Writable<SimpleNotification[]>;

export const initNotificationContext = () => {
	const store = writable<SimpleNotification[]>([]);
	setContext<NotificationContext>(key, store);
	const { update, subscribe } = store;
	return {
		subscribe,
		delete: (id: string) => {
			update((notifications) => notifications.filter((n) => n.id !== id));
		}
	};
};

const create = <T extends Notification>(notification: Omit<T, 'id'>) => ({
	...notification,
	id: nanoid()
});

export const getNotificationStore = () => {
	const store = getContext<NotificationContext>(key);
	if (!store) {
		throw new Error('Notification Context not found');
	}
	const { subscribe, update } = store;
	return {
		subscribe,
		info: (message: string) =>
			update((notifications) => [
				...notifications,
				create({ $type: NotificationType.info, message })
			]),
		success: (message: string) =>
			update((notifications) => [
				...notifications,
				create({ $type: NotificationType.success, message })
			]),
		error: (message: string) =>
			update((notifications) => [
				...notifications,
				create({ $type: NotificationType.error, message })
			])
	};
};
