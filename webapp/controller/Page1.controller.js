sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"poc/ziapdemo/model/CustomerFormat",
	'poc/ziapdemo/model/InitPage',
	'poc/ziapdemo/model/InitPage1'
], function (Controller, Fragment, MessageToast, History, JSONModel, CustomerFormat, InitPageUtil, InitPageUtil1) {
	"use strict";

	return Controller.extend("poc.ziapdemo.controller.Page1", {

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
		},

		initCustomFormat: function () {
			CustomerFormat.registerCustomFormat();
		},

		onPressBillingStatus: function () {
			var panel2 = this.getView().byId("panel2");
			var panel3 = this.getView().byId("panel3");
			panel2.setVisible(true);
			panel3.setVisible(false);

			this.initCustomFormat();

			var oModel = this.getOwnerComponent().getModel("BillingStatusSet");
			this.getView().setModel(oModel);

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: true
					}
				},
				categoryAxis: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true,
					text: 'Billing Document Status'
				}
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var btnAction = {};
			btnAction.type = 'action';
			btnAction.text = "Manage Billing Documents";
			btnAction.press = function (oEvent) {
				oRouter.navTo("Page5");
			};

			InitPageUtil.initPageSettings(this.getView());
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.setActionItems([btnAction]);
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);

		},

		onPressSalesByMonth: function () {
			var panel2 = this.getView().byId("panel2");
			var panel3 = this.getView().byId("panel3");
			panel2.setVisible(false);
			panel3.setVisible(true);

			this.initCustomFormat();

			var oModel = this.getOwnerComponent().getModel("SalesMonthSet");
			this.getView().setModel(oModel);

			var oVizFrame1 = this.oVizFrame = this.getView().byId("idVizFrame1");
			oVizFrame1.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: true
					}
				},
				categoryAxis: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true,
					text: 'Sales By Month'
				}
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var btnAction = {};
			btnAction.type = 'action';
			btnAction.text = "Manage Billing Documents";
			btnAction.press = function (oEvent) {
				oRouter.navTo("Page5");
			//	oRouter.navTo("Page2");
			//window.open("https://freedomec2.localdomain:8001/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=369&sap-language=EN#AccountingDocument-uploadGLDocument","_blank");
			};

			InitPageUtil1.initPageSettings(this.getView());
			var oPopOver1 = this.getView().byId("idPopOver1");
			oPopOver1.setActionItems([btnAction]);
			oPopOver1.connect(oVizFrame1.getVizUid());
			oPopOver1.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
		}

	});

});