import { toast } from 'react-toastify';
import { api } from '~/utils/api';

export const useSetInlineStylesOneRequest = () => {
	return api.dashboard.css.inlineStyles.setOne.useMutation({
		onError(error) {
			toast(error.message, { type: 'error' });
		},
		onSuccess() {
			toast('Successful submission!', { type: 'success' });
		},
	});
};
