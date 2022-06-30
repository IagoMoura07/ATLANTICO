# estoque-mercado-crud

Solução desenvolvida em teste tecnico para Instituto Atlatico.

##Versões <br>
As versões dos Frameworks e Libs utilizadas são: <br>
NodeJS v14.15.1<br>
Gulp v4.0.2 - CLI v2.3.0<br>
NPM v6.14.8<br>
Yo v4.3.0<br>
PNP/SP v2.3.0<br>
SPFx Yoman Generator v1.14.0<br>
<br><br>
Observações importantes: <br>
O nome da lista usada foi: SUPERMERCADO (Field da lista tambem é SUPERMERCADO) <br>
O field dos campos da lista foi: NOME_PRODUTO, QUANTIDADE, DATA_VALIDADE, TIPO_PRODUTO, PRODUTO_IMPORTADO, DATA_SEM_FORMATACAO<br>
O campo DATA_SEM_FORMATACAO so existe na lista do Sharepoint e serve unica e exclusivamente para consulta da data.<br>
O campo QUANTIDADE foi definido como Number, todos os demais definidos como Texto com uma linha.<br><br>

O tipo de produto e alimentado por uma lista auxiliar do Sharepoint com nome de TIPO_PRODUTO, o campo tambem se chama TIPO_PRODUTO.<br><br>


https://www.youtube.com/watch?v=fRlwJAEr3j0 - Link do video demonstrativo.<br><br>

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
