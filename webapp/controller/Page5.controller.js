sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History"
], function (Controller, Fragment, MessageToast, History) {
	"use strict";

	return Controller.extend("poc.ziapdemo.controller.Page5", {

		onInit: function () {
			this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);
			var toolPage = this.getView().byId("toolPage");
			toolPage.setSideExpanded(false);

			var poFormPanel = this.getView().byId("container1");
			var oHtmlChange = new sap.ui.core.HTML({
				content: "<embed src='https://freedomec2.localdomain:8001/sap/bc/ui2/flp?sap-client=369&sap-ushell-config=headerless#BillingDocument-manage' width='1200' height='800'>"
			});
			poFormPanel.addItem(oHtmlChange);
			
		},

		onSideNavButtonPress: function () {
			var viewId = this.getView().getId();
			var toolPage = this.getView().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();
			this._setToggleButtonTooltip(sideExpanded);
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function (bLarge) {
			var toggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		},

		handleUserNamePress: function (oEvent) {
			var oButton = oEvent.getSource();

			// create action sheet only once
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment(
					"poc.ziapdemo.fragments.UserMenu",
					this
				);
				this.getView().addDependent(this._actionSheet);
			}

			this._actionSheet.openBy(oButton);
		}

	});

});