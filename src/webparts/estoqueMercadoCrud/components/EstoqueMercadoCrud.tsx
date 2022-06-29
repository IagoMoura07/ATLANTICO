import * as React from 'react';
import styles from './EstoqueMercadoCrud.module.scss';
import { IEstoqueMercadoCrudProps } from './IEstoqueMercadoCrudProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

//window.addEventListener('load', tipoproduto);

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
              <div className={styles.itemField}onClick={this.tipoproduto}>
                <div className={styles.fieldLabel}onLoad={this.tipoproduto} >*Tipo de Produto</div>
                <select id="TIPO_PRODUTO">

                </select>
              </div>
              <div className={styles.table}>
                <div className={styles.table1}>Todos os Itens:</div>
                <div id="allitems"></div>
              </div>
              <div className={styles.buttonSection}>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.createItem}>Criar item</span>
                </div>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.getItemById}>Importar</span>
                </div>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.getAllitems}>Ver todos</span>
                </div>
                <div className={styles.button}>
                  <span className={styles.label} onClick={this.updateItem}>Atualizar</span>
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


  private tipoproduto = async () => {
    const items: any[] = await sp.web.lists.getByTitle("TIPO_PRODUTO").items.get();
    console.log(items);
    if (items.length > 0) {
      var html_fornecedores = `<select id="TIPO_PRODUTO">`
      items.map((item, index) => {
        html_fornecedores += `<option value="${item.TIPO_PRODUTO}">${item.TIPO_PRODUTO}</option>`;
      })
      html_fornecedores += `</select>`
      document.getElementById("TIPO_PRODUTO").innerHTML = html_fornecedores;
    }
    else {
      console.log(`Lista Vazia`);
    }
  }

  //Criar item

  private createItem = async () => {
    var nome_produto = document.getElementById("NOME_PRODUTO")['value'];
    var quantidade = document.getElementById("QUANTIDADE")['value'];
    var data = document.getElementById("DATA_VALIDADE")['value'];
    var tipo_produto = document.getElementById("TIPO_PRODUTO")['value'];
    var produto_importado = document.getElementById("PRODUTO_IMPORTADO")['value'];

    //Converte a data para padrão BR
    var data_br = new Date(data);
    var data_formatada = data_br.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    //Verifica campos vazios
    if (produto_importado === "") {
      alert("O campo Produto importado e diferente de SIM ou NAO");


    }
    if (nome_produto.trim() === "") {
      alert("O campo Nome do Produto esta vazio");

    }
    if (quantidade === "") {
      alert("O campo Quantidade esta vazio");

    }
    if (data === "") {
      alert("O campo Data de Validade esta vazio");

    }
    if (tipo_produto === "") {
      alert("O campo Tipo de produto esta vazio");

    }


    try {



      if (nome_produto.trim() && quantidade && data && tipo_produto && produto_importado != "") {
        //Imput de dados via na lista
        const addItem = await sp.web.lists.getByTitle("SUPERMERCADO").items.add({ //Lista utilizada SUPERMERCADO - Altera para nome da lista usada
          'NOME_PRODUTO': nome_produto,
          'QUANTIDADE': quantidade,
          'PRODUTO_IMPORTADO': produto_importado,
          'DATA_VALIDADE': data_formatada,
          'TIPO_PRODUTO': tipo_produto,
          'DATA_SEM_FORMATACAO': data
        });

        //Limpa os campos do formulario
        console.log(addItem);
        alert(`Item adicionado com sucesso. ID: ${addItem.data.ID}`);
        document.getElementById("NOME_PRODUTO")['value'] = "";
        document.getElementById("QUANTIDADE")['value'] = "";
        document.getElementById("PRODUTO_IMPORTADO")['value'] = "";
        document.getElementById("DATA_VALIDADE")['value'] = "";
        document.getElementById("TIPO_PRODUTO")['value'] = "";

      }
      else {
        console.log("erro");
      }
    }
    catch (e) {
      console.error(e);
    }

  }


  //Buscar por ID
  private getItemById = async () => {
    try {
      //Seleciona ID do item digitado
      const id: number = document.getElementById('itemId')['value'];

      if (id > 0) {
        const item: any = await sp.web.lists.getByTitle("SUPERMERCADO").items.getById(id).get(); //Busca na lista pelo ID
        document.getElementById('NOME_PRODUTO')['value'] = item.NOME_PRODUTO;
        document.getElementById('QUANTIDADE')['value'] = item.QUANTIDADE;
        document.getElementById('PRODUTO_IMPORTADO')['value'] = item.PRODUTO_IMPORTADO;
        document.getElementById('DATA_VALIDADE')['value'] = item.DATA_SEM_FORMATACAO;
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
  private getAllitems = async () => {
    try {
      const items: any[] = await sp.web.lists.getByTitle("SUPERMERCADO").items.get();
      console.log(items);
      if (items.length > 0) {
        //Gera uma variavel com o HTML da tabela contendo o conteudo da lista 
        var html = `<table width="100px" border = "1" cellspacing="2" cellpadding="4"><tr align="center"><th width="250px">ID</th><th>Nome Produto</th><th>Quantidade    </th> <th>Produto Importado    </th> <th>Data de Validade    </th> <th>Tipo do Produto    </th></tr>`;
        items.map((item, index) => {
          html += `<tr align="center"><td>${item.ID}      </td><td>${item.NOME_PRODUTO}      </td><td>${item.QUANTIDADE}      </td> <td>${item.PRODUTO_IMPORTADO}      </td> <td>${item.DATA_VALIDADE}      </td> <td>${item.TIPO_PRODUTO}      </td></li>`;
        });
        html += `</table>`;
        document.getElementById("allitems").innerHTML = html;
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
    var nome_produto = document.getElementById("NOME_PRODUTO")['value'];
    var quantidade = document.getElementById("QUANTIDADE")['value'];
    var data = document.getElementById("DATA_VALIDADE")['value'];
    var tipo_produto = document.getElementById("TIPO_PRODUTO")['value'];
    var produto_importado = document.getElementById("PRODUTO_IMPORTADO")['value'];


    //Verifica campos vazios
    if (produto_importado === "") {
      alert("O campo Produto importado e diferente de SIM ou NAO");


    }
    if (nome_produto.trim() === "") {
      alert("O campo Nome do Produto esta vazio");

    }
    if (quantidade === "") {
      alert("O campo Quantidade esta vazio");

    }
    if (data === "") {
      alert("O campo Data de Validade esta vazio");

    }
    if (tipo_produto === "") {
      alert("O campo Tipo de produto esta vazio");

    }
    var data_br = new Date(data);
    var data_formatada = data_br.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    try {
      if (nome_produto.trim() && quantidade && data && tipo_produto && produto_importado != "") {
        const id: number = document.getElementById('itemId')['value'];
        if (id > 0) {
          //Imput de dados via na lista
          const itemUpdate = await sp.web.lists.getByTitle("SUPERMERCADO").items.getById(id).update({
            'NOME_PRODUTO': nome_produto,
            'QUANTIDADE': quantidade,
            'PRODUTO_IMPORTADO': produto_importado,
            'DATA_VALIDADE': data_formatada,
            'TIPO_PRODUTO': tipo_produto
          });
          //Limpa os campos do formulario
          console.log(itemUpdate);
          alert(`Item com ID: ${id} Alterado com sucesso`);
          document.getElementById("NOME_PRODUTO")['value'] = "";
          document.getElementById("QUANTIDADE")['value'] = "";
          document.getElementById("PRODUTO_IMPORTADO")['value'] = "";
          document.getElementById("DATA_VALIDADE")['value'] = "";
          document.getElementById("TIPO_PRODUTO")['value'] = "";
          document.getElementById("itemId")['value'] = "";
        }
        else {
          alert(`Por favor insira um ID Valido`);
        }
      }
    }

    catch (e) {
      console.log(e);
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
        document.getElementById("NOME_PRODUTO")['value'] = "";
        document.getElementById("QUANTIDADE")['value'] = "";
        document.getElementById("PRODUTO_IMPORTADO")['value'] = "";
        document.getElementById("DATA_VALIDADE")['value'] = "";
        document.getElementById("TIPO_PRODUTO")['value'] = "";
        document.getElementById("itemId")['value'] = "";

      }
      else {
        alert(`Por favor insira um ID Valido`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
};

