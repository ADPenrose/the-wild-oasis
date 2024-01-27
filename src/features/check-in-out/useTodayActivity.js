import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useTodayActivity() {
	const { activities, isPending } = useQuery({
		queryFn: getStaysTodayActivity,
		queryKey: ['todayActivity'],
	});

	return { activities, isPending };
}
