import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
	// Importing the settings info. We set the settings to an empty object as a
	// default value because initialiy the settings are undefined. As soon as they
	// are fetched, React Query will update the settings and the component will
	// re-render.
	const {
		isPending,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();

	// We get the mutation function from the useSettings hook.
	const { isUpdating, updateSetting } = useUpdateSetting();

	// This function will be called when the user updates a setting.
	function handleUpdate(event, settingName) {
		// We get the value from the input field.
		const value = event.target.value;
		// If there is no value, return.
		if (!value) return;
		// We call the updateSetting function and pass it the settingName and the value. For this, we use a dynamic object key.
		// https://hackmamba.io/blog/2020/11/dynamic-javascript-object-keys/
		updateSetting({ [settingName]: value });
	}

	// This is for the loading spinner.
	if (isPending) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'minBookingLength')}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
