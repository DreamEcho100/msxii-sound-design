import * as Dialog from '@radix-ui/react-dialog';

import {
	Dispatch,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	SetStateAction,
	useId,
	useState
} from 'react';

import { BiX } from 'react-icons/bi';

import { cx } from 'class-variance-authority';

import { useGlobalStore } from '~/store';
import Clickable from '~/components/shared/core/Clickable';

const AuthDialog = () => {
	const isAuthDialogOpen = useGlobalStore((store) => store.dialogs.auth.isOpen);
	const toggleAuthDialogOpen = useGlobalStore(
		(store) => store.dialogs.auth.toggleOpen
	);
	const authDialogType = useGlobalStore((store) => store.dialogs.auth.type);

	return (
		<Dialog.Root open={isAuthDialogOpen}>
			<Dialog.Portal>
				<Dialog.Overlay
					className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-20"
					onClick={toggleAuthDialogOpen}
				/>
				<Dialog.Content className="z-20 data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-screen-xl-sm -translate-x-1/2 -translate-y-1/2 rounded-md bg-bg-primary-100 dark:bg-bg-primary-500 text-text-primary-400 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					{authDialogType === 'login' ? (
						<LoginDialogContent />
					) : (
						<RegisterDialogContent />
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default AuthDialog;

const DialogContentHeader = ({
	titleProps = {},
	descriptionProps = {}
}: {
	titleProps: Parameters<typeof Dialog.Title>[0];
	descriptionProps?: Parameters<typeof Dialog.Description>[0];
}) => {
	const toggleAuthDialogOpen = useGlobalStore(
		(store) => store.dialogs.auth.toggleOpen
	);

	return (
		<header className="flex flex-col gap-3">
			<Dialog.Close onClick={toggleAuthDialogOpen} asChild>
				<button
					className={cx(
						'absolute top-3 right-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full text-2xl',
						'text-special-primary-700 hover:text-special-primary-700/75',
						'dark:text-special-primary-500 dark:hover:text-special-primary-500/90',
						'focus:shadow-special-primary-500 focus:shadow-[0_0_0_0.125rem] focus:outline-none'
					)}
					aria-label="Close"
				>
					<BiX />
				</button>
			</Dialog.Close>
			<Dialog.Title
				className="text-text-primary-500 m-0 text-h3 font-medium"
				{...titleProps}
			/>
			<Dialog.Description
				className="text-text-primary-400 text-sm leading-normal"
				{...descriptionProps}
			/>
		</header>
	);
};

const LoginDialogContent = () => {
	const setAuthDialogState = useGlobalStore(
		(store) => store.dialogs.auth.setDialogType
	);

	const [formValues, setFormValues] = useState({
		email: '',
		password: ''
	});

	return (
		<>
			<DialogContentHeader
				titleProps={{ children: 'Login' }}
				descriptionProps={{
					children: (
						<>
							Don&apos;t have an account?{' '}
							<Clickable
								className={cx(
									'font-semibold',
									'text-special-primary-700 hover:text-special-primary-700/75',
									'dark:text-special-primary-500 dark:hover:text-special-primary-500/90'
								)}
								variants={{ btn: null, px: null, py: null }}
								onClick={() => setAuthDialogState('register')}
							>
								Create a new one
							</Clickable>
						</>
					)
				}}
			/>
			<form className="flex flex-col gap-4 py-4">
				<FormInput
					name={'email'}
					setFormValues={setFormValues}
					placeholder="* Email"
					required
					type="email"
				/>
				<FormInput
					name={'password'}
					setFormValues={setFormValues}
					placeholder="* Password"
					required
					type="password"
				/>
				<Clickable
					type="submit"
					variants={{ py: 'sm', w: 'full' }}
					className="mt-4"
				>
					Submit
				</Clickable>
			</form>
		</>
	);
};

const RegisterDialogContent = () => {
	const setAuthDialogState = useGlobalStore(
		(store) => store.dialogs.auth.setDialogType
	);

	const [formValues, setFormValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		acceptMarketing: false
	});

	return (
		<>
			<DialogContentHeader
				titleProps={{ children: 'Register' }}
				descriptionProps={{
					children: (
						<>
							Have an account?{' '}
							<Clickable
								className={cx(
									'font-semibold',
									'text-special-primary-700 hover:text-special-primary-700/75',
									'dark:text-special-primary-500 dark:hover:text-special-primary-500/90'
								)}
								variants={{ btn: null, px: null, py: null }}
								onClick={() => setAuthDialogState('login')}
							>
								login
							</Clickable>
						</>
					)
				}}
			/>
			<form className="flex flex-col gap-4 py-4">
				<FormInput
					name={'firstName'}
					setFormValues={setFormValues}
					placeholder="* First Name"
					required
					type="firstName"
				/>
				<FormInput
					name={'lastName'}
					setFormValues={setFormValues}
					placeholder="* Last Name"
					required
					type="lastName"
				/>
				<FormInput
					name={'email'}
					setFormValues={setFormValues}
					placeholder="* Email"
					required
					type="email"
				/>
				<FormInput
					name={'password'}
					setFormValues={setFormValues}
					placeholder="* Password"
					required
					type="password"
				/>
				<Clickable
					type="submit"
					variants={{ py: 'sm', w: 'full' }}
					className="mt-4"
				>
					Submit
				</Clickable>
			</form>
		</>
	);
};

const FormInput = <FormValues extends Record<string, unknown>>({
	name,
	label,
	labelProps = {},
	setFormValues,
	...props
}: InputHTMLAttributes<HTMLInputElement> & {
	name: keyof FormValues;
	label?: string;
	labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
	setFormValues: Dispatch<SetStateAction<FormValues>>;
}) => {
	const baseId = useId();
	return (
		<div className="flex flex-col gap-2">
			{(labelProps || label) && (
				<label htmlFor={baseId} {...labelProps}>
					{label}
				</label>
			)}
			<input
				className="px-3 py-2 rounded-t-sm border-[0.0625rem] border-transparent border-b-text-primary-500/50 hover:border-b-text-primary-500/75 focus:border-b-text-primary-500 focus:outline-none"
				id={baseId}
				onChange={(event) =>
					setFormValues((prev) => ({
						...prev,
						[name]: event.target.value
					}))
				}
				{...props}
				name={name}
			/>
		</div>
	);
};
