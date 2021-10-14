/* eslint-disable new-parens */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */

/**
 * THIS FILE IS USED FOR THE AGILITY'S CUSTOM FIELDS
 */


var FriendlyURLFormField = function () {
	var self = this;

	self.Label = "Friendly URL";
	self.ReferenceName = "FriendlyURL";

	self.Render = function (options) {
		/// <summary>
		///  The Render handler for this field.  Create any elements and bindings that you might need, pull down resources.
		/// </summary>
		/// <param name="options" type="ContentManager.Global.CustomInputFieldParams">The options used to render this field.</param>
	}

	/// <field name="Template" type="String">The partial HTML template that represents your custom field. Your ViewModel will be automatically bound to this template.</field>
	self.Template =  'https://agility.github.io/CustomFields/friendly-url/html/friendly-url-template.html';

	/// <field name="DepenenciesJS"> type="Array">The Javscript dependencies that must be loaded before your ViewModel is bound. They will be loaded in the order you specify.</field>
	self.DependenciesJS = [];

	/// <field name="DepenenciesCSS" type="Array">The CSS dependencies that must be loaded before your ViewModel is bound. They will be loaded in the order you specify.</field>
	self.DependenciesCSS = [];


	/// <field name="ViewModel" type="KO ViewModel">The KO ViewModel that will be binded to your HTML template</field>
	self.ViewModel = function (options) {
		/// <summary>The KO ViewModel that will be binded to your HTML template.</summary>
		/// <param name="options" type="Object">
		///     <field name="$elem" type="jQueryElem">The .field-row jQuery Dom Element.</field>
		///     <field name="contentItem" type="ContentItem Object">The entire Content Item object including Values and their KO Observable properties of all other fields on the form.</field>
		///     <field name="fieldBinding" type="KO Observable">The value binding of thie Custom Field Type. Get and set this field's value by using this property.</field>
		///     <field name="fieldSetting" type="Object">Object representing the field's settings such as 'Hidden', 'Label', and 'Description'</field>
		///     <field name="readonly" type="boolean">Represents if this field should be readonly or not.</field>
		/// </param>

		var self = this;
		self.relatedField = "Title"; //the other field value we want to make friendly
		self.value = options.fieldBinding;
		self.contentID = options.contentItem.ContentID;
		self.attrBinding = {};

		if (options.fieldSetting.Settings.Required === "True") {
			self.attrBinding['data-parsley-required'] = true;
		}


		self.makeFriendlyString = function (s) {
			if (s) {
				var r = s.toLowerCase();
				r = r.replace(new RegExp("\\s", 'g'), "-");
				r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
				r = r.replace(new RegExp("æ", 'g'), "ae");
				r = r.replace(new RegExp("ç", 'g'), "c");
				r = r.replace(new RegExp("[èéêë]", 'g'), "e");
				r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
				r = r.replace(new RegExp("ñ", 'g'), "n");
				r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
				r = r.replace(new RegExp("œ", 'g'), "oe");
				r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
				r = r.replace(new RegExp("[ýÿ]", 'g'), "y");

				r = r.replace(new RegExp("[^\\w\\-@-]", 'g'), "-");
				r = r.replace(new RegExp("--+", 'g'), "-");


				if (r.lastIndexOf("-") > 0 && r.lastIndexOf("-") == r.length - 1) {
					r = r.substring(0, r.length - 1);
				}
			}

			return r;
		};

		self.regenerateUrl = function () {
			ContentManager.ViewModels.Navigation.messages().show("By changing the URL you could create broken links.\nWe recommend you add in a URL redirection from the old URL to the new URL.\nAre you sure you wish to continue?", "Re-generate URL",
				ContentManager.Global.MessageType.Question, [{
					name: "OK",
					defaultAction: true,
					callback: function () {
						var friendlyStr = self.makeFriendlyString(options.contentItem.Values[self.relatedField]());
						self.value(friendlyStr);
					}
				},
				{
					name: "Cancel",
					cancelAction: true,
					callback: function () {
						//do nothing...
					}
				}]);
		}

		//subscribe to the related field changes
		options.contentItem.Values[self.relatedField].subscribe(function (newVal) {
			//auto generate if this is a new item
			if (options.contentItem.ContentID() < 0) {
				var friendlyStr = self.makeFriendlyString(newVal);
				self.value(friendlyStr);
			}

		});

	}
}

ContentManager.Global.CustomInputFormFields.push(new FriendlyURLFormField());

//
// Markdown field
//
var MarkdownCustomField = function () {
	/// <summary>The type definition of this Agility Custom Field Type.</summary>
	var self = this;

	/// <field name="Label" type="String">The display name of the Custom Field Type</field>
	self.Label = "Markdown";

	/// <field name="ReferenceName" type="String">The internal reference name of the Custom Field Type. Must not contain any special characters.</field>
	self.ReferenceName = "Markdown";

	/// <field name="Render" type="Function">This function runs every time the field is rendered</field>
	self.Render = function (options) {
		/// <summary>
		///  The Render handler for this field.  Create any elements and bindings that you might need, pull down resources.
		///  This method will be called everytime to the field value changes.
		/// </summary>
		/// <param name="options" type="ContentManager.Global.CustomInputFieldParams">The options used to render this field.</param>



		//get our base element
		var $pnl = $(".markdown-field", options.$elem);

		if ($pnl.size() == 0) {
			/*
			Pull in the simple but awesome MD editor here:
			https://github.com/sparksuite/simplemde-markdown-editor
			*/
			var htmlContent = `
				<div class="markdown-field">
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
					<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
					<textarea data-bind='value:value'></textarea>
				</div>
				`;
			//pull down the html template and load it into the element
			options.$elem.append(htmlContent)

			$pnl = $(".markdown-field", options.$elem);

			//bind our viewmodel to this
			var viewModel = function () {

				/// <summary>The KO ViewModel that will be binded to your HTML template.</summary>
				/// <param name="options" type="Object">
				///     <field name="$elem" type="jQueryElem">The .field-row jQuery Dom Element.</field>
				///     <field name="contentItem" type="ContentItem Object">The entire Content Item object including Values and their KO Observable properties of all other fields on the form.</field>
				///     <field name="fieldBinding" type="KO Observable">The value binding of thie Custom Field Type. Get and set this field's value by using this property.</field>
				///     <field name="fieldSetting" type="Object">Object representing the field's settings such as 'Hidden', 'Label', and 'Description'</field>
				///     <field name="readonly" type="boolean">Represents if this field should be readonly or not.</field>
				/// </param>
				var self = this;

				self.value = options.fieldBinding; //.extend({ throttle: 500 });

				//TODO: determine a better way to detect if the SimpleMDE object is ready
				setTimeout(function () {

					var simplemde = new SimpleMDE({ element: $("textarea", options.$elem)[0] });
					simplemde.codemirror.on("change", function () {
						self.value(simplemde.value())
					});

				}, 1000)

			}

			ko.applyBindings(viewModel, $pnl.get(0));
		}

	}
}

ContentManager.Global.CustomInputFormFields.push(new MarkdownCustomField());

var ChooseProductCustomField = function () {
	/// <summary>The type definition of this Agility Custom Field Type.</summary>
	var self = this;

	/// <field name="Label" type="String">The display name of the Custom Field Type</field>
	self.Label = "Choose Ecommerce Product";

	/// <field name="ReferenceName" type="String">The internal reference name of the Custom Field Type. Must not contain any special characters.</field>
	self.ReferenceName = "ChooseEcommerceProduct";

	/// <field name="Render" type="Function">This function runs every time the field is rendered</field>
	self.Render = function (options) {
		/// <summary>
		///  The Render handler for this field.  Create any elements and bindings that you might need, pull down resources.
		///  This method will be called everytime to the field value changes.
		/// </summary>
		/// <param name="options" type="ContentManager.Global.CustomInputFieldParams">The options used to render this field.</param>



		//get our base element
		var $pnl = $(".product-picker-field", options.$elem);

		if ($pnl.size() == 0) {

			var htmlContent = `
				<style>
				.prod-item {
					display: flex;
					align-items: center;
				}
				.prod-img {
					display:block;
					height: 40px;
					border-radius: 10px;
					width: 40px;
					background-size: cover;
    				background-repeat: no-repeat;
				}
				.prod-img-small  {
					margin-top: 2px;
					display:inline-block;
					height: 20px;
					border-radius: 5px;
					width: 20px;
					background-size: cover;
    				background-repeat: no-repeat;
				}
				.prod-text {
					flex: 1;
					margin-left: 5px;
					line-height: 20px;
				}
				</style>
				<input class='product-picker-field' type='hidden' style='width:100%' data-bind='value:selectedValue,select2:select2'>`;
			//pull down the html template and load it into the element
			options.$elem.append(htmlContent)

			$pnl = $(".product-picker-field", options.$elem);


			//bind our viewmodel to this
			var viewModel = function () {

				/// <summary>The KO ViewModel that will be binded to your HTML template.</summary>
				/// <param name="options" type="Object">
				///     <field name="$elem" type="jQueryElem">The .field-row jQuery Dom Element.</field>
				///     <field name="contentItem" type="ContentItem Object">The entire Content Item object including Values and their KO Observable properties of all other fields on the form.</field>
				///     <field name="fieldBinding" type="KO Observable">The value binding of thie Custom Field Type. Get and set this field's value by using this property.</field>
				///     <field name="fieldSetting" type="Object">Object representing the field's settings such as 'Hidden', 'Label', and 'Description'</field>
				///     <field name="readonly" type="boolean">Represents if this field should be readonly or not.</field>
				/// </param>
				var self = this;

				ContentManager.DataAccess.GetPreviewUrl()

				self.ajaxRequest = null;

				self.selectedValue = options.fieldBinding.extend({ throttle: 500 });

				self.formatResult = function (item) {

					return $(`<div class="prod-item"><div class='prod-img' style="background-image:url('${item.imageUrl}')"></div><div class='prod-text'>${item.name}</div></div>`);
					//return item.node.title;
				};


				self.formatSelection = function (item) {

					return $(`<div class="prod-item"><div class='prod-img-small' style="background-image:url('${item.imageUrl}')"></div><div class='prod-text'>${item.name}</div></div>`);

				};
				self.ajaxRequest = null;

				self.select2 = {
					label: 'Product',
					readOnly: false,
					value: options.fieldBinding,
					multiple: false,
					maximumSelectionSize: 1,
					minimumInputLength: 0,
					placeholder: 'Find product...',
					formatResult: self.formatResult,
					formatSelection: self.formatSelection,
					templateResult: self.templateResult,

					matcher: function (term, text) {
						return true;
					},

					id: function (obj) {

						return JSON.stringify(obj)
					},

					ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
						url: "https://my-bigcommerce-store-oct-14.vercel.app/api/search-products",
						//url: "http://localhost:3000/api/search-products",
						dataType: 'json',
						type: "get",
						quietMillis: 250,

						originalValue: ko.unwrap(options.fieldBinding),
						term: "",
						data: function (term, page, params) {
							return {
								search: term, // search term
							};
						},
						results: function (data, page) {

							return {
								results: data
							};
						},
						current: function (data) {
							console.log("CURRENT", data)
						},
						cache: true
					},
					initSelection: function (element, callback) {
						//use the hidden "product name" field
						var json = ko.unwrap(options.fieldBinding);

						if (json && json.length > 0) {
							var node = JSON.parse(json)
							callback(node)
						}



						// console.log(val)

						// var label = ko.unwrap(options.contentItem.Values.ProductName);

						// if (val && label) {
						// 	var data = {
						// 		node: {
						// 			id: val,
						// 			title: label
						// 		}
						// 	};

						// 	callback(data);
						// }
					},
					allowClear: false,
					dropdownCssClass: "bigdrop",
					change: function(e) {

						if (e.added) {
							var obj = e.added
							//set the title and the description if we have them
							if (options.contentItem.Values.Title) {
								options.contentItem.Values.Title(obj.name)
							}
							if (options.contentItem.Values.Description) {

								if (obj.description.indexOf("/>") != -1) {
									obj.description =   $(obj.description).text()
								}

								options.contentItem.Values.Description(obj.description)
							}

							if (options.contentItem.Values.CTA) {
								var productUrl = "~/product" + obj.slug
								var cta = "<a href=" + productUrl + ">Buy Now</a>"
								options.contentItem.Values.CTA(cta)
							}

						}
					}
				};
			}

			ko.applyBindings(viewModel, $pnl.get(0));
		}

	}
}

ContentManager.Global.CustomInputFormFields.push(new ChooseProductCustomField());
