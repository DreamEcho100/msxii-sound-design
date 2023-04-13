export interface Variant {
	id: number;
	title: string;
	option1: string;
	option2: any | null;
	option3: any | null;
	sku: string;
	requires_shipping: boolean;
	taxable: boolean;
	featured_image:
		| string
		| {
				id: number;
				product_id: number;
				position: number;
				created_at: string;
				updated_at: string;
				alt: null;
				width: number;
				height: number;
				src: string;
				variant_ids: number[];
		  }
		| null;
	featured_media?: {
		alt: null;
		id: number;
		position: number;
		preview_image: {
			aspect_ratio: number;
			height: number;
			width: number;
			src: string;
		};
	} | null;
	quantity_rule?: {
		min: number | null;
		max: number | null;
		increment: number;
	} | null;
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
	barcode: string | null;
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
	quantity_rule?: {
		min: number | null;
		max: number | null;
		increment: number;
	} | null;
	url: string;
	media: Media[];
	requires_selling_plan: boolean;
	selling_plan_groups: any[];
}
