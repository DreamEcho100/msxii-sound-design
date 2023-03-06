import { fakeProductsData } from './appData';

export type Product = (typeof fakeProductsData)[0];

export interface Variant {
	id: number;
	title: string;
	option1: string;
	option2: any | null;
	option3: any | null;
	sku: string;
	requires_shipping: boolean;
	taxable: boolean;
	featured_image: any | null;
	available: boolean;
	name: string;
	public_title: string | null;
	options: string[];
	price: number;
	weight: number;
	compare_at_price: number | null;
	inventory_quantity: number;
	inventory_management: any | null;
	inventory_policy: string;
	barcode: string;
	requires_selling_plan: boolean;
	selling_plan_allocations: any[];
}

export interface PreviewImage {
	aspect_ratio: number;
	height: number;
	width: number;
	src: string;
}

export interface Media {
	alt: any | null;
	id: number;
	position: number;
	preview_image: PreviewImage;
	aspect_ratio: number;
	height: number;
	media_type: string;
	src: string;
	width: number;
}

export interface ShopifyProduct {
	id: number;
	title: string;
	handle: string;
	description: string;
	published_at: Date | string;
	created_at: Date | string;
	vendor: string;
	type: string;
	tags: string[];
	price: number;
	price_min: number;
	price_max: number;
	available: boolean;
	price_varies: boolean;
	compare_at_price: number | null;
	compare_at_price_min: number;
	compare_at_price_max: number;
	compare_at_price_varies: boolean;
	variants: Variant[];
	images: string[];
	featured_image: string;
	options: {
		name: string;
		position: number;
		values: string[];
	}[];
	url: string;
	media: Media[];
	requires_selling_plan: boolean;
	selling_plan_groups: any[];
}
