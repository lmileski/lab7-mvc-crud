// initialize mvc on dom ready
import { Model } from './model.js';
import { View } from './view.js';
import { Controller } from './controller.js';

window.addEventListener('DOMContentLoaded', () => {
	const model = new Model();
	const view = new View();
	new Controller(model, view);
});