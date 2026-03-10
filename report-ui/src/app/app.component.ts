import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule, PoContainerModule, PoFieldModule, PoButtonModule, PoDropdownModule, PoTableModule, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoContainerModule,
    PoFieldModule,
    PoButtonModule,
    PoDropdownModule,
    PoTableModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private readonly API_URL: string = 'http://10.0.0.3:8181/rest/api/framework/v1/genericQuery?';
  private readonly DEFAULT_QUERY: string = 'SF2010 SF2 JOIN SA1010 SA1 ON SF2.F2_CLIENTE = SA1.A1_COD AND SF2.F2_LOJA = SA1.A1_LOJA';
  private readonly DEFAULT_TABLES: string = 'SF2,SA1';
  private readonly DEFAULT_FIELDS: string = 'A1_cod,A1_NOME,F2_EMISSAO,F2_DOC,F2_VALMERC';
  private readonly DEFAULT_DELETED: string = `SA1.D_E_L_E_T_<>'*' AND SF2.D_E_L_E_T_<>'*' AND `;

  private readonly DEFAULT_USER: string = 'admin';
  private readonly DEFAULT_PWD: string = '2828fundag';

  loading: boolean = false;

  clienteDe: string = '000001';
  clienteAte: string = '999999';
  dtEmissaoDe: string = '01/01/2025';
  dtEmissaoAte: string = '15/01/2025';

  items: Array<any> = [];
  columns: Array<PoTableColumn> = [
    { property: 'a1_cod', type: 'string' },
    { property: 'a1_nome', type: 'string' },
    { property: 'f2_emissao', type: 'date' },
    { property: 'f2_doc', type: 'string' },
    { property: 'f2_valmerc', type: 'number' }
  ];

  loadingExport: boolean = false;
  titleExport: string = 'Relatório de Vendas';
  actionsExport: Array<PoMenuItem> = [
    { label: 'Exportar para Excel' },
    { label: 'Exportar para PDF' }
  ];

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
  ];

  constructor(
    private http: HttpClient
  ) { }

  buildWhereClause(): string {
    let where = this.DEFAULT_DELETED;
    let emissaoDe = this.dtEmissaoDe.replace(/-/g, '');
    let emissaoAte = this.dtEmissaoAte.replace(/-/g, '');

    if (this.clienteDe && this.clienteAte) {
      where += ` A1_COD BETWEEN '${this.clienteDe}' AND '${this.clienteAte}'`;
    }
    if (this.dtEmissaoDe && this.dtEmissaoAte) {
      where += ` AND SF2.F2_EMISSAO BETWEEN '${emissaoDe}' AND '${emissaoAte}'`;
    }
    return where;
  }

  pesquisar(page: number = 1) {

    //console.log('WHERE', this.buildWhereClause());
    const username = this.DEFAULT_USER;
    const password = this.DEFAULT_PWD;
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    //Declarar os parâmetros da consulta
    const params = new HttpParams()
      .set('FromQry', this.DEFAULT_QUERY)
      .set('tables', this.DEFAULT_TABLES)
      .set('fields', this.DEFAULT_FIELDS)
      .set('where', this.buildWhereClause())

    this.loading = true;
    this.http.get(this.API_URL, { headers: { 'Authorization': authHeader }, params: params })
      .subscribe({
        next: (response: any) => {
          console.log('Response: => ', response);
          this.items = response.items;
          this.loading = false;
        }
      });
  }

  exportarExcel() {
    // Lógica para exportar para Excel
    const API_EXCEL = "";
    this.titleExport = "Consulta_Notas_Fiscais";

    const username = this.DEFAULT_USER;
    const password = this.DEFAULT_PWD;
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    const body = {
      struct: this.columns
    }

    //Declarar os parâmetros da consulta
    const params = new HttpParams()
      .set('FromQry', this.DEFAULT_QUERY)
      .set('tables', this.DEFAULT_TABLES)
      .set('fields', this.DEFAULT_FIELDS)
      .set('where', this.buildWhereClause())

    this.loadingExport = true;
    this.http.post(API_EXCEL, body, { headers: { 'Authorization': authHeader }, params: params })
      .subscribe({
        next: (response: any) => {
          console.log('Response: => ', response);
        }
      });
  }

  reset() {
    this.clienteDe = '000001';
    this.clienteAte = '999999';
    this.dtEmissaoDe = '';
    this.dtEmissaoAte = '';
    this.items = [];
  }

  private onClick() {
    this.clienteDe = '000002';
    this.dtEmissaoDe = '02/01/2025';
  }
}
