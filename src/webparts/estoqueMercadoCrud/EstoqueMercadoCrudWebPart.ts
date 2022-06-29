import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'EstoqueMercadoCrudWebPartStrings';
import EstoqueMercadoCrud from './components/EstoqueMercadoCrud';
import { IEstoqueMercadoCrudProps } from './components/IEstoqueMercadoCrudProps';
	
import { sp } from "@pnp/sp/presets/all";

export interface IEstoqueMercadoCrudWebPartProps {
  description: string;
}

export default class EstoqueMercadoCrudWebPart extends BaseClientSideWebPart<IEstoqueMercadoCrudWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IEstoqueMercadoCrudProps> = React.createElement(
      EstoqueMercadoCrud,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  //Create Item
  private createItem = async () => {
    try {
      const addItem = await sp.web.lists.getByTitle("EmployeeDetails").items.add({
        'Title': document.getElementById("fullName")['value'],
        'Age': document.getElementById("age")['value']
      });
      console.log(addItem);
      alert(`Item created successfully with ID: ${addItem.data.ID}`);
    }
    catch (e) {
      console.error(e);
    }
  }
 
  
//Get Item by ID
  private getItemById = async () => {
    try {
      const id: number = document.getElementById('itemId')['value'];
      if (id > 0) {
        const item: any = await sp.web.lists.getByTitle("EmployeeDetails").items.getById(id).get();
        document.getElementById('fullName')['value'] = item.Title;
        document.getElementById('age')['value'] = item.Age;
      }
      else {
        alert(`Please enter a valid item id.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
 
  
//Get all items
  private getAllItems = async () => {
    try {
      const items: any[] = await sp.web.lists.getByTitle("EmployeeDetails").items.get();
      console.log(items);
      if (items.length > 0) {
        var html = `<table><tr><th>ID</th><th>Full Name</th><th>Age</th></tr>`;
        items.map((item, index) => {
          html += `<tr><td>${item.ID}</td><td>${item.Title}</td><td>${item.Age}</td></li>`;
        });
        html += `</table>`;
        document.getElementById("allItems").innerHTML = html;
      } else {
        alert(`List is empty.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
 
  
//Update Item
  private updateItem = async () => {
    try {
      const id: number = document.getElementById('itemId')['value'];
      if (id > 0) {
        const itemUpdate = await sp.web.lists.getByTitle("EmployeeDetails").items.getById(id).update({
          'Title': document.getElementById("fullName")['value'],
          'Age': document.getElementById("age")['value']
        });
        console.log(itemUpdate);
        alert(`Item with ID: ${id} updated successfully!`);
      }
      else {
        alert(`Please enter a valid item id.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
 
  
//Delete Item
  private deleteItem = async () => {
    try {
      const id: number = parseInt(document.getElementById('itemId')['value']);
      if (id > 0) {
        let deleteItem = await sp.web.lists.getByTitle("EmployeeDetails").items.getById(id).delete();
        console.log(deleteItem);
        alert(`Item ID: ${id} deleted successfully!`);
      }
      else {
        alert(`Please enter a valid item id.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}
