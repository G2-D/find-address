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
			<div class="row">
				<div class="col-md-4 mb-3">
					<input type="text" class="form-control" id="postal_code" name="postal_code" placeholder="CEP"  required="" />
				</div>
				<div class="col-md-8 mb-3">
					<input type="text" class="form-control" id="address" name="address" placeholder="LOGRADOURO" />
				</div>
			</div>
			<div class="row">
				<div class="col-md-9 mb-3">
					<input type="text" class="form-control" id="complement" name="complement" placeholder="COMPLEMENTO" />
				</div>
				<div class="col-md-3 mb-3">
					<input type="text" class="form-control" id="number" name="number" placeholder="Nº"  />
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 mb-3">
					<input type="text" class="form-control" id="district" name="district" placeholder="BAIRRO" />
				</div>
			</div>
			<div class="row">
				<div class="col-md-8 mb-3">
					<input type="text" class="form-control" id="city" name="city" placeholder="CIDADE" />
				</div>
				<div class="col-md-4 mb-3">
					<input type="text" class="form-control" id="state" name="state" placeholder="ESTADO" />
				</div>
			</div>
		`;

    const button = `
			<div class="row">
				<div class="col-md-12 mt-4 mb-3">
					<button class="btn btn-brand btn-lg btn-block" type="submit">Consultar</button>
				</div>
			</div>
		`;

    if (!this._container.closest("form")) {
      const form = document.createElement("form");

      form.innerHTML = fields + button;

      form.addEventListener("submit", this.submitForm.bind(this));

      this._container.appendChild(form);

      return this;
    }

    const div = document.createElement("div");

    div.innerHTML = fields;

    div
      .querySelector("#postal_code")
      .addEventListener("blur", this.blurField.bind(this));

    this._container.appendChild(div);

    return this;
  }

  async submitForm(e) {
    e.preventDefault();

    const { target } = e;
    const postalCode = target.elements.postal_code.value;

    this.getPostalData(postalCode);
  }

  blurField(e) {
    const { target } = e;
    const postalCode = target.value.replace(/\D+/g, "");

    if (postalCode.length >= 8) {
      this.getPostalData(postalCode);
    }
  }

  async getPostalData(postalCode) {
    const response = await fetch(
      `https://api.postmon.com.br/v1/cep/${postalCode}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200 && response.ok) {
      const { logradouro, bairro, cidade, estado } = await response.json();

      this._container.querySelector("#address").value = logradouro || "";
      this._container.querySelector("#district").value = bairro || "";
      this._container.querySelector("#city").value = cidade || "";
      this._container.querySelector("#state").value = estado || "";
    }
  }
}
