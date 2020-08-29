export default class FormPostalCode {

	constructor(container) {

		this._container = container;

		if (!this._container) {

			throw "Container não definido";
		}
	}

	create() {

		if (!this._container.nodeName) {

			this._container = document.querySelector(this._container);
		}

		if (!this._container) {

			throw "Container não encontrado";
		}

		const fields = `
			<div class="form-group">
				<label for="postal_code">
					Cep
				</label>
				<input type="text" class="form-control" id="postal_code" name="posta_code" placeholder="Ex: 12345-567">
			</div>
			<label for="address">
				Logradouro
			</label>
			<input type="text" class="form-control" id="address" name="address" />
			<label for="district">
				Bairro
			</label>
			<input type="text" class="form-control" id="district" name="district" />
			<label for="city">
				Cidade
			</label>
			<input type="text" class="form-control" id="city" name="city" />
			<label for="state">
				Estado
			</label>
			<input type="text" class="form-control" id="state" name="state" />
		`;

		const button = `
			<button type="submit" class="btn btn-primary">
				Consultar
			</button>
		`;

		if (!this._container.closest('form')) {

			const form = document.createElement('form');

			form.innerHTML = fields + button;

			form.addEventListener('submit', this.submitForm.bind(this));
			
			this._container.appendChild(form);

			return this;
		}

		const div = document.createElement('div');

		div.innerHTML = fields;

		div.querySelector('#postal_code').addEventListener('blur', this.blurField.bind(this));

		this._container.appendChild(div)

		return this;
	}

	async submitForm(e) {

		e.preventDefault();

		const { target } = e;
		const postalCode  = target.elements.postal_code.value;

		this.getPostalData(postalCode);
	}

	blurField(e) {

		const { target } = e;
		const postalCode  = target.value;

		if (postalCode.length >= 8) {

			this.getPostalData(postalCode);
		}
	}

	async getPostalData(postalCode) {

		const response = await fetch(`http://api.postmon.com.br/v1/cep/${postalCode}`, {
			method : 'GET'
		});

		if (response.status === 200 && response.ok) {

			const { logradouro, bairro, cidade, estado } = await response.json();
	
			this._container.querySelector('#address').value 	= logradouro || '';
			this._container.querySelector('#district').value 	= bairro || '';
			this._container.querySelector('#city').value 		= cidade || '';
			this._container.querySelector('#state').value 		= estado || '';
		}
	}
}