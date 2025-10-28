// controller coordinates user actions between view and model
import { getBotResponse } from './eliza.js';

export class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		// track if we're editing a prior user message inline
		this.editingId = null;

		// subscribe view to model updates
		this.model.onChange(s => this.view.render(s));

		// wire view events
		this.view.onSend = t => this.handleSend(t);
		this.view.onEdit = id => this.handleEditPrompt(id);
		this.view.onDelete = id => this.handleDelete(id);
		this.view.onExport = () => this.handleExport();
		this.view.onImport = j => this.handleImport(j);
		this.view.onClear = () => this.handleClear();

		// keyboard helpers from the view
		this.view.onClearInput = () => this.view.clearInput();
		this.view.onCancelEdit = () => this.cancelInlineEdit();
		this.view.onEditLast = () => this.editLastMessageInline();

		// seed greeting if empty
		if (this.model.getState().messages.length === 0) {
			this.model.addMessage("Hey there! I'm your Eliza assistant. How can I help you today?", 'bot');
		}

		this.view.render(this.model.getState());
		this.view.focusInput();
	}

	// send either commits an inline edit or sends a fresh message
	handleSend(text) {
		const trimmed = String(text || '').trim();
		if (!trimmed) return;

		// commit inline edit if active
		if (this.editingId) {
			const ok = this.model.updateMessage(this.editingId, trimmed);
			this.editingId = null;
			this.view.clearInput();
			this.view.focusInput();
			if (!ok) return;
			return;
		}

		// normal send flow
		const user = this.model.addMessage(trimmed, 'user');
		if (!user) return;
		const reply = getBotResponse(trimmed);
		this.model.addMessage(reply, 'bot');
		this.view.clearInput();
		this.view.focusInput();
	}

	// simple prompt-based editing when clicking the edit button
	handleEditPrompt(id) {
		const msg = this.model.getState().messages.find(m => m.id === id);
		if (!msg || msg.role !== 'user') return;
		const next = this.view.prompt('edit your message:', msg.text);
		if (next == null) return;
		this.model.updateMessage(id, String(next));
	}

	handleDelete(id) {
		// confirm destructive action
		if (!this.view.confirm('delete this message?')) return;
		this.model.deleteMessage(id);
	}

	handleClear() {
		// confirm destructive action
		if (!this.view.confirm('clear all messages?')) return;
		this.model.clearAll();
		this.cancelInlineEdit();
	}

	handleExport() {
		// provide chat export as json
		this.view.download('chat-export.json', this.model.exportJson());
	}

	handleImport(json) {
		// import and validate json payload
		const ok = this.model.importJson(json);
		if (!ok) this.view.alert('import failed. please use a valid file.');
	}

	// begin inline edit for the last user-authored message
	editLastMessageInline() {
		const msgs = this.model.getState().messages;
		const lastUser = [...msgs].reverse().find(m => m.role === 'user');
		if (!lastUser) return;
		this.editingId = lastUser.id;
		this.view.setInputText(lastUser.text);
		this.view.focusInput();
	}

	// cancel inline edit and clear the compose box
	cancelInlineEdit() {
		this.editingId = null;
		this.view.clearInput();
		this.view.focusInput();
	}
}