import React, {  useEffect, useState } from "react";

import { PageContainer, PageContent, Nav, Footer, Table } from "../Layout";

import './style.scss';

export default function Quotes() {
  let headers = [
    {
      id: "id",
      title: "ID",
    },
    {
      id: "item_name",
      title: "Name",
    },
    {
      id: "item_description",
      title: "Descrição",
    },
    {
      id: "installments",
      title: "Parcelas",
    },
    {
      id: "item_value",
      title: "Valor Total",
    },
  ];

  return (
    <PageContainer isFixedNav>
      <Nav />
      <PageContent
        title="Cotação"
        
      >
       {  <Table headers={headers} />}
      </PageContent>
      <Footer />
    </PageContainer>
  );
}
