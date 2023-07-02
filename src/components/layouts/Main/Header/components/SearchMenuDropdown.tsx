import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BiSearchAlt2, BiX } from 'react-icons/bi';
import { useStore } from 'zustand';
import Clickable from '~/components/shared/core/Clickable';
import { globalStore } from '~/store';

const SearchMenuDropdown = () => {
	const productTitleQueryInputRef = useRef<HTMLInputElement>(null);
	const [formValues, setFormValues] = useState({
		productTitleQuery: ''
	});
	const isSearchMenuDropdownOpen = useStore(
		globalStore,
		(store) => store.menus.isSearchMenuDropdownOpen
	);

	const router = useRouter();

	useEffect(() => {
		if (isSearchMenuDropdownOpen) productTitleQueryInputRef.current?.focus();
	}, [isSearchMenuDropdownOpen]);

	return (
		<AnimatePresence>
			{isSearchMenuDropdownOpen && (
				<motion.div
					initial={{ opacity: 0.75, y: '-100%' }}
					animate={{ opacity: 1, y: '0%' }}
					exit={{ opacity: 0, y: '-100%' }}
					transition={{ duration: 0.3 }}
					className="flex justify-end"
				>
					<div className="bg-bg-primary-0 w-full max-w-screen-md md:rounded-b-lg md:mx-auto lg:mx-8 overflow-hidden">
						<form
							className="bg-bg-primary-600/75 dark:bg-bg-primary-400 text-text-primary-600  flex items-center px-4 gap-4"
							onSubmit={(event) => {
								event.preventDefault();

								if (
									formValues.productTitleQuery.length !== 0 &&
									formValues.productTitleQuery.length < 3
								)
									return;

								router.push(
									`collections?productTitleQuery=${formValues.productTitleQuery}`
								);
							}}
						>
							<Clickable
								variants={null}
								className=" focus:bg-black/25 duration-100 transition-all"
								type="submit"
							>
								<BiSearchAlt2 className="text-[125%]" />
							</Clickable>
							<div className="bg-bg-primary-0 flex-grow rounded-3xl my-2 flex overflow-hidden">
								<input
									ref={productTitleQueryInputRef}
									type="search"
									className="bg-transparent flex-grow outline-none px-3"
									placeholder="What are you looking for?"
									name="productTitleQuery"
									onChange={(event) =>
										setFormValues((prev) => ({
											...prev,
											[event.target.name]: event.target.value
										}))
									}
									value={formValues.productTitleQuery}
								/>
								<Clickable
									variants={null}
									className="px-2 py-1 text-text-primary-300"
									onClick={() => {
										setFormValues(() => ({ productTitleQuery: '' }));
										productTitleQueryInputRef.current?.focus();
									}}
								>
									<BiX className="text-[125%]" />
								</Clickable>
							</div>
						</form>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SearchMenuDropdown;
