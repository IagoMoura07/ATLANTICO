import * as React from 'react';
import styles from './EstoqueMercadoCrud.module.scss';
import { IEstoqueMercadoCrudProps } from './IEstoqueMercadoCrudProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


export default class EstoqueMercadoCrud extends React.Component<IEstoqueMercadoCrudProps, {}> {
  public render(): React.ReactElement<IEstoqueMercadoCrudProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      
      
      <div className={styles.EstoqueMercadoCrud}>
        <div className={styles.container}>
          <div className={styles.fila}>
            <div className={styles.coluna}>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>ID do Item:</div><br></br>
                <input type="text" id='itemId'></input>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>*Nome Produto:</div>
                <input type="text" id='NOME_PRODUTO'></input>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>*Quantidade:</div>
              <input type="number" id="QUANTIDADE"></input>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>*Data Validade:</div>
                <input type="date" id='DATA_VALIDADE'></input>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>*Produto é Importado?</div>
                <select id="PRODUTO_IMPORTADO">
                  <option value=""></option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>*Tipo de Produto</div>
                <select id="TIPO_PRODUTO">
                  <option value=""></option>
                  <option value="Cereais">Cereais</option>
                  <option value="Produtos de limpeza">Produtos de limpeza</option>
                  <option value="Laticínios">Laticínios</option>
                  <option value="Cosméticos">Cosméticos</option>
                </select>
              </div>
              <div className={styles.table}>
                <div className={styles.table1}>Todos os Itens:</div>
                <div id="allItems"></div>
              </div>
              <div className={styles.buttonSection}>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.createItem}>Criar item</span>
                </div>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.getItemById}>Importar</span>
                </div>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.getAllItems}>Ver todos</span>
                </div>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.updateItem}>Update</span>
                </div>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.deleteItem}>Apagar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //Criar item
  //Teste GIT
  private createItem = async () => {
    if (document.getElementById("PRODUTO_IMPORTADO")['value'] === "") {
      alert("O campo Produto importado e diferente de SIM ou NAO");


    }
    if (document.getElementById("NOME_PRODUTO")['value'] === "") {
      alert("O campo Nome do Produto esta vazio");

    }
    if (document.getElementById("QUANTIDADE")['value'] === "") {
      alert("O campo Quantidade esta vazio");

    }
    if (document.getElementById("DATA_VALIDADE")['value'] === "") {
      alert("O campo Data de Validade esta vazio");

    }
    if (document.getElementById("TIPO_PRODUTO")['value'] === "") {
      alert("O campo Tipo de produto esta vazio");

    }

    try {
      if (document.getElementById("PRODUTO_IMPORTADO" && "NOME_PRODUTO" && "QUANTIDADE" && "DATA_VALIDADE" && "TIPO_PRODUTO")['value'] != "") {
        const addItem = await sp.web.lists.getByTitle("SUPERMERCADO").items.add({
          'NOME_PRODUTO': document.getElementById("NOME_PRODUTO")['value'],
          'QUANTIDADE': document.getElementById("QUANTIDADE")['value'],
          'PRODUTO_IMPORTADO': document.getElementById("PRODUTO_IMPORTADO")['value'],
          'DATA_VALIDADE': document.getElementById("DATA_VALIDADE")['value'],
          'TIPO_PRODUTO': document.getElementById("TIPO_PRODUTO")['value']
        });


        console.log(addItem);
        alert(`Item adicionado com sucesso. ID: ${addItem.data.ID}`);
        document.getElementById("NOME_PRODUTO")['value'] = "";
        document.getElementById("QUANTIDADE")['value'] = "";
        document.getElementById("PRODUTO_IMPORTADO")['value'] = "";
        document.getElementById("DATA_VALIDADE")['value'] = "";
        document.getElementById("TIPO_PRODUTO")['value'] = "";
      }
    }
    catch (e) {
      console.error(e);
    }

  }


  //Buscar por ID
  private getItemById = async () => {
    try {
      const id: number = document.getElementById('itemId')['value'];
      if (id > 0) {
        const item: any = await sp.web.lists.getByTitle("SUPERMERCADO").items.getById(id).get();
        document.getElementById('NOME_PRODUTO')['value'] = item.NOME_PRODUTO;
        document.getElementById('QUANTIDADE')['value'] = item.QUANTIDADE;
        document.getElementById('PRODUTO_IMPORTADO')['value'] = item.PRODUTO_IMPORTADO;
        document.getElementById('DATA_VALIDADE')['value'] = item.DATA_VALIDADE;
        document.getElementById('TIPO_PRODUTO')['value'] = item.TIPO_PRODUTO;
      }
      else {
        alert(`Por favor insira um ID Valido`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }


  //Buscar todos os itens
  private getAllItems = async () => {
    try {
      const items: any[] = await sp.web.lists.getByTitle("SUPERMERCADO").items.get();
      console.log(items);
      if (items.length > 0) {
        var html = `<table width="100px" border = "1" cellspacing="2" cellpadding="4"><tr align="center"><th width="250px">ID</th><th>Nome Produto</th><th>Quantidade    </th> <th>Produto Importado    </th> <th>Data de Validade    </th> <th>Tipo do Produto    </th></tr>`;
        items.map((item, index) => {
          html += `<tr align="center"><td>${item.ID}      </td><td>${item.NOME_PRODUTO}      </td><td>${item.QUANTIDADE}      </td> <td>${item.PRODUTO_IMPORTADO}      </td> <td>${item.DATA_VALIDADE}      </td> <td>${item.TIPO_PRODUTO}      </td></li>`;
        });
        html += `</table>`;
        document.getElementById("allItems").innerHTML = html;
      } else {
        alert(`Lista está vazia`);
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
        const itemUpdate = await sp.web.lists.getByTitle("SUPERMERCADO").items.getById(id).update({
          'NOME_PRODUTO': document.getElementById("NOME_PRODUTO")['value'],
          'QUANTIDADE': document.getElementById("QUANTIDADE")['value']
        });
        console.log(itemUpdate);
        alert(`Item com ID: ${id} Alterado com sucesso`);
        document.getElementById("NOME_PRODUTO")['value'] = "";
        document.getElementById("QUANTIDADE")['value'] = "";
        document.getElementById("PRODUTO_IMPORTADO")['value'] = "";
        document.getElementById("DATA_VALIDADE")['value'] = "";
        document.getElementById("TIPO_PRODUTO")['value'] = "";
      }
      else {
        alert(`Por favor insira um ID Valido`);
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
        let deleteItem = await sp.web.lists.getByTitle("SUPERMERCADO").items.getById(id).delete();
        console.log(deleteItem);
        alert(`Item ID: ${id} apagado com sucesso`);
      }
      else {
        alert(`Por favor insira um ID Valido`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}