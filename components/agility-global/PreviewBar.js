import React from 'react';

const PreviewBar = ({ isPreview, isDevelopmentMode }) => {

	if (isPreview && !isDevelopmentMode) {
		return (
			<div className="agility-preview-bar">
				<img className="agility-preview-bar__logo" src="https://media.agilitycms.com/preview-bar/2018-11/agility-logo-preview-bar-1.png" alt="Powered by Agility CMS" />
				<span className="agility-preview-bar__text">You are viewing the latest changes in <strong>Preview Mode</strong>.</span>
				<div>
					<button className="agility-preview-bar__btn agility-preview-bar__btn-share" title="Click to generate a share-able link" onClick={getPreviewLink}>Share</button>
					<button className="agility-preview-bar__btn" title="Click to exit preview" onClick={exitPreview}>Exit Preview</button>
				</div>
			</div>
		)
	} else if(isDevelopmentMode) {
		return (
			<div className="agility-preview-bar">
				<img className="agility-preview-bar__logo" src="https://media.agilitycms.com/preview-bar/2018-11/agility-logo-preview-bar-1.png" alt="Powered by Agility CMS" />
				<span className="agility-preview-bar__text">You are viewing the latest changes in <strong>Development Mode</strong>.</span>
				<div></div>
			</div>
		)
	} else {
		return null
	}
}

const exitPreview = () => {
	const exit = confirm("Would you like to exit Preview Mode?");
	if (exit === true) {
		window.location = `/api/exitPreview?slug=${window.location.pathname}`;
	}
}

const getPreviewLink = () => {
	const xhr = new XMLHttpRequest();
	xhr.onload = function () {

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			// What do when the request is successful

			const previewKey = xhr.responseText;
			const previewLink = `${window.location.pathname}?agilitypreviewkey=${escape(previewKey)}`;

			prompt("To share this page in preview mode with others, copy the link below:", previewLink);

		} else {
			// What do when the request fails
			alert('Could not generate Preview Link. This indicates a problem with the API route that generates a Preview Link.')
		}
	};

	// Create and send a GET request
	xhr.open('GET', '/api/generatePreviewKey');
	xhr.send();
}

export default PreviewBar;