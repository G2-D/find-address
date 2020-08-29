const useFetch = async (url, options) => {

	return await fetch(url, options);
};

export default class FormPostalCode {

	constructor(container) {

		this._container = container;

		if (!this._container) {

			throw "Container não definido";
		}
	}

	configure({ action, method }) {

		this._action = action;
		this._method = method;

		return this;
	}

	create() {

		const form = document.createElement('form');

		if (this._method) {

			form.method = this._method;
		}

		if (this._action) {

			form.action = this._action;
		}
		
		form.classList.add('form');
		form.innerHTML = `
			<div class="col-lg-12">
				<div class="form-group">
					<label for="postal_code">
						Postal Code
					</label>
					<input type="text" class="form-control" id="postal_code" placeholder="Ex: 12345-567">
				</div>
				<button type="submit" class="btn btn-primary">
					Consultar
				</button>
			</div>
		`;

		if (!this._container.nodeName) {

			this._container = document.querySelector(this._container);
		}

		if (!this._container) {

			throw "Container não encontrado";
		}

		this._container.appendChild(form);

		return this;
	}
}