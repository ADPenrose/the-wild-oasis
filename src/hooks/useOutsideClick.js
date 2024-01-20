import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	// Allowing to close the modal by clicking on the backdrop.
	useEffect(
		function () {
			function handleClick(e) {
				// If the click occurs outside the ref element, execute the handler.
				if (ref.current && !ref.current.contains(e.target)) handler();
			}

			// We need to handle the click event on the capture phase, so that
			// it is not executed while bubbling up, which would cause the element
			// to close immediately after opening.
			document.addEventListener('click', handleClick, listenCapturing);

			// Cleanup function.
			return function () {
				document.removeEventListener('click', handleClick, listenCapturing);
			};
		},
		[handler, listenCapturing]
	);

	return { ref };
}
