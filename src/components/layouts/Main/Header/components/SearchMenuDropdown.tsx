import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BiSearchAlt2, BiX } from 'react-icons/bi';
import Clickable from '~/components/shared/core/Clickable';
import { useGlobalStore } from '~/utils/store';

const SearchMenuDropdown = () => {
	const searchQueryInputRef = useRef<HTMLInputElement>(null);
	const [formValues, setFormValues] = useState({
		searchQuery: ''
	});
	const { isSearchMenuDropdownOpen } = useGlobalStore((store) => store.menus);

	useEffect(() => {
		if (isSearchMenuDropdownOpen) searchQueryInputRef.current?.focus();
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
					<div className="bg-bg-primary-0 w-full max-w-screen-md md:rounded-b-lg  md:mx-8 overflow-hidden">
						<form className="bg-bg-primary-600/75 dark:bg-bg-primary-400 text-text-primary-600  flex items-center px-4 gap-4">
							<Clickable
								variants={null}
								className=" focus:bg-black/25 duration-100 transition-all"
								type="submit"
							>
								<BiSearchAlt2 className="text-[125%]" />
							</Clickable>
							<div className="bg-bg-primary-0 flex-grow rounded-3xl my-2 flex overflow-hidden">
								<input
									ref={searchQueryInputRef}
									type="search"
									className="bg-transparent flex-grow outline-none px-3"
									placeholder="What are you looking for?"
									name="searchQuery"
									onChange={(event) =>
										setFormValues((prev) => ({
											...prev,
											[event.target.name]: event.target.value
										}))
									}
									value={formValues.searchQuery}
								/>
								<Clickable
									variants={null}
									className="px-2 py-1 text-text-primary-300"
									onClick={() => {
										setFormValues(() => ({ searchQuery: '' }));
										searchQueryInputRef.current?.focus();
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
