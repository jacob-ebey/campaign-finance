import "bootstrap/scss/bootstrap.scss";
import "bootstrap/scss/bootstrap-reboot.scss";

import App from './App.html';
import "./global.scss";

const page = document.body.getAttribute("data-page") || "home";

const app = new App({
	target: document.body,
	data: {
		page
	}
});

export default app;