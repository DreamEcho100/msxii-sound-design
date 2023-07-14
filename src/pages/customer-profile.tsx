import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import PagePrimaryLoader from '~/components/shared/Loaders/PagePrimary';
import PageLoaderContainer from '~/components/shared/LoadersContainers/Page';
import { globalStore } from '~/store';
import { useRouter } from 'next/navigation';
import { ShopifyCustomer, ShopifyOrder } from '~/utils/shopify/types';
import Link from 'next/link';
import { formatPrice } from '~/utils/shopify';
import { useIsMounted } from '~/utils/hooks';
import CustomNextImage from '~/components/shared/CustomNextImage';
import CustomDialog, { DialogContentHeader } from '~/components/shared/Dialog';

const TitleValue = (props: {
	title: string;
	value?: string | number | null;
}) => {
	if (!props.value) return <></>;

	return (
		<div className="flex">
			<span className="text-sm font-semibold">{props.title}:</span>
			<span className="text-sm">{props.value}</span>
		</div>
	);
};
const ProductsOnOrder = ({
	lineItems,
	buttonText,
	statusUrl,
	financialStatus,
}: {
	lineItems: ShopifyOrder['lineItems']['edges'];
	buttonText: string;
	statusUrl: string;
	financialStatus: string;
}) => {
	const isMounted = useIsMounted();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsOpen(true)}>{buttonText}</button>
			<CustomDialog
				// contentVariants={{ bg: 'primary-2' }}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				<DialogContentHeader
					titleProps={{
						children:
							financialStatus === 'PAID' ? (
								<>
									{buttonText}{' '}
									<small className="text-sm text-purple-700">
										<a href={statusUrl} target="_blank" rel="noreferrer">
											Go to the download page
										</a>
									</small>
								</>
							) : undefined,
					}}
				/>
				<div className="flex flex-col gap-4">
					{lineItems.map(({ node: item }, index) => {
						if (!item?.variant?.id) return <Fragment key={index} />;

						return (
							<div key={item.variant.id}>
								<div className="flex">
									<div className="w-36 flex items-center bg-black">
										{item?.variant?.image?.url && (
											<CustomNextImage
												src={item.variant.image.url}
												alt={item.variant.image.altText || ''}
												width={150}
												height={150}
												className="w-full h-full aspect-square object-contain"
											/>
										)}
									</div>
									<div className="p-2">
										<p>{item.title}</p>
										<p>
											Total Price{' '}
											{formatPrice(
												Number(item.originalTotalPrice.amount),
												item.originalTotalPrice.currencyCode,
												isMounted,
											)}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</CustomDialog>
		</>
	);
};

const CustomerProfileScreen = (props: {
	customerData: {
		customer: ShopifyCustomer;
		accessToken: string;
	};
}) => {
	const isMounted = useIsMounted();
	const orders = useMemo(() => {
		let aNum: number;
		let bNum: number;

		return props.customerData.customer.orders?.edges
			?.slice()
			.sort(function (a, b) {
				aNum = Date.parse(a.node.processedAt);
				bNum = Date.parse(b.node.processedAt);
				if (aNum === bNum) return 0;

				return aNum > bNum ? -1 : 1;
			});
	}, [props.customerData.customer.orders?.edges]);

	return (
		<>
			<section className="p-8">
				<h1 className="text-h1">Customer Profile</h1>
				{/* <p>
					<TitleValue title="ID" value={props.customerData.customer.id} />
				</p> */}
				<p>
					<TitleValue title="email" value={props.customerData.customer.email} />
				</p>
				<p>
					<TitleValue
						title="first name"
						value={props.customerData.customer.firstName}
					/>
				</p>
				<p>
					<TitleValue
						title="last name"
						value={props.customerData.customer.lastName}
					/>
				</p>
				<p>
					<TitleValue title="phone" value={props.customerData.customer.phone} />
				</p>
				{props.customerData.customer.defaultAddress && (
					<address>
						<p>
							<TitleValue
								title="address 1"
								value={props.customerData.customer.defaultAddress.address1}
							/>
						</p>
						<p>
							<TitleValue
								title="address 2"
								value={props.customerData.customer.defaultAddress.address2}
							/>
						</p>
						<p>
							<TitleValue
								title="country"
								value={props.customerData.customer.defaultAddress.country}
							/>
						</p>
						<p>
							<TitleValue
								title="province"
								value={props.customerData.customer.defaultAddress.province}
							/>
						</p>
						<p>
							<TitleValue
								title="city"
								value={props.customerData.customer.defaultAddress.city}
							/>
						</p>
						<p>
							<TitleValue
								title="phone"
								value={props.customerData.customer.defaultAddress.phone}
							/>
						</p>
						<p>
							<TitleValue
								title="zip"
								value={props.customerData.customer.defaultAddress.zip}
							/>
						</p>
					</address>
				)}
				{/* <p>Created At: {props.customerData.customer.createdAt}</p> */}
				{/* <p>Updated At: {props.customerData.customer.updatedAt}</p> */}
				{/* <p>Accepts Marketing: {props.customerData.customer.acceptsMarketing}</p> */}
			</section>

			<section className="p-8">
				{!Array.isArray(orders) ||
				orders.length === 0 ||
				!('node' in orders[0]!) ? (
					<p>
						<span>There&apos;s no orders</span>&nbsp;
						<Link
							href="/collections"
							className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
						>
							let&apos;s do something about that
						</Link>
					</p>
				) : (
					<>
						<table className="orders-table w-full border-collapse overflow-x-auto table-fixed">
							<thead className="border border-gray-500 font-bold">
								<tr>
									<th className="px-8 py-6 md:px-12 md:py-8">Order</th>
									<th className="px-8 py-6 md:px-12 md:py-8">Payment</th>
									<th className="px-8 py-6 md:px-12 md:py-8">Total</th>
								</tr>
							</thead>
							<tbody>
								{orders.map(({ node: itemNode }) => (
									<tr key={itemNode.id}>
										<td className="px-8 py-6 md:px-12 md:py-8 border border-gray-500">
											<span className="title font-bold hidden">
												Order:&nbsp;
											</span>
											<span className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600">
												{/* {itemNode.name} */}
												<ProductsOnOrder
													lineItems={itemNode.lineItems.edges}
													buttonText={itemNode.name}
													statusUrl={itemNode.statusUrl}
													financialStatus={itemNode.financialStatus}
												/>
											</span>
											&nbsp;-&nbsp;
											<span>
												{new Date(itemNode.processedAt).toLocaleDateString(
													undefined,
													{
														dateStyle: 'medium',
													},
												)}
											</span>
										</td>
										<td className="px-8 py-6 md:px-12 md:py-8 border border-gray-500 capitalize">
											<span className="title font-bold hidden">
												Payment:&nbsp;
											</span>
											{itemNode.financialStatus?.toLowerCase()}
										</td>
										<td className="px-8 py-6 md:px-12 md:py-8 border border-gray-500">
											<span className="title font-bold hidden">
												Total:&nbsp;
											</span>
											{formatPrice(
												Number(itemNode.totalPrice.amount),
												itemNode.totalPrice.currencyCode,
												isMounted,
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<style jsx>{`
							.orders-table {
								border-collapse: collapse;
								width: 100%;
							}

							/* .orders-table tr {
				padding: 0.35em;
			} */

							.orders-table th,
							.orders-table td {
								text-align: center;
							}

							/* .orders-table th {
				text-transform: uppercase;
			} */

							@media screen and (max-width: 600px) {
								.orders-table {
									border: 0;
								}

								.orders-table caption {
									font-size: 1.3em;
								}

								.orders-table thead {
									border: none;
									clip: rect(0 0 0 0);
									height: 1px;
									margin: -1px;
									overflow: hidden;
									padding: 0;
									position: absolute;
									width: 1px;
								}

								.orders-table tr {
									border-bottom: 3px solid #ddd;
									display: block;
									margin-bottom: 0.625em;
								}

								.orders-table td {
									border-bottom: 1px solid #ddd;
									display: block;
									font-size: 0.8em;
									text-align: initial;
								}

								.orders-table td .title {
									display: inline-block;
									width: 25%;
									max-width: fit-content;
								}

								.orders-table td::before {
									/*
* aria-label has no advantage, it won't be read inside a table
content: attr(aria-label);
*/
									content: attr(data-label);
									float: left;
									font-weight: bold;
									text-transform: uppercase;
								}

								.orders-table td:last-child {
									border-bottom: 0;
								}
							}
							@media screen and (max-width: 400px) {
								.orders-table td {
									padding: 0.5rem;
									white-space: break-spaces;
								}
								.orders-table td .title {
									width: auto;
								}
							}
						`}</style>
					</>
				)}
			</section>
		</>
	);
};

const CustomerProfilePage = () => {
	const router = useRouter();
	const customerSession = useStore(
		globalStore,
		(store) => store.customerSession,
	);
	const toggleOpenAuthDialog = useStore(
		globalStore,
		(store) => store.dialogs.auth.toggleOpen,
	);

	useEffect(() => {
		if (customerSession.status === 'unauthenticated') {
			router.push('/');
			toggleOpenAuthDialog();
		}
	}, [customerSession.status, router, toggleOpenAuthDialog]);

	if (customerSession.isLoading)
		return (
			<PageLoaderContainer>
				<PagePrimaryLoader />
			</PageLoaderContainer>
		);

	if (customerSession.status === 'authenticated')
		return <CustomerProfileScreen customerData={customerSession.data} />;

	return customerSession.status;
};

export default CustomerProfilePage;
