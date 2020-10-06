sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History"
], function (Controller, Fragment, MessageToast,History) {
	"use strict";

	return Controller.extend("poc.ziapdemo.controller.Dashboard", {
		onInit: function () {
			this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);
			var toolPage = this.getView().byId("toolPage");
			toolPage.setSideExpanded(false);
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
	
		onItemSelect: function (oEvent) {
			var item = oEvent.getParameter('item');
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo(item.getKey());
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
		},

		onPressSettings: function (oEvent) {
			MessageToast.show("Selected '" + oEvent.getSource().getText() + "'");
		}
	});
});