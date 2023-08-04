import { getCookies, setCookie, getCookie, deleteCookie } from 'cookies-next';
import { type OptionsType } from 'cookies-next/lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirstParam<Func extends (...params: any[]) => any> = NonNullable<
	Parameters<Func>[0]
>;

type Req = FirstParam<typeof getCookies>['req'];
type Res = FirstParam<typeof getCookies>['res'];
type omittedOptionsType = Omit<OptionsType, 'req' | 'res'>;

export const getCookieManger = (req: Req, res: Res) => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setOne: (key: string, value: any, options: omittedOptionsType = {}) =>
			setCookie(key, value, { req, res, ...options }),
		getOne: (key: string, options: omittedOptionsType = {}) =>
			getCookie(key, { req, res, ...options }),
		getAll: (options: omittedOptionsType = {}) =>
			getCookies({ req, res, ...options }),
		deleteOne: (key: string, options: omittedOptionsType = {}) =>
			deleteCookie(key, { req, res, ...options }),
	};
};
