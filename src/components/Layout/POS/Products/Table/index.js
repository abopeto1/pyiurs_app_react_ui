/* Dependencies */
import React from 'react'
import { Table } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status, page } = props

  React.useEffect(
    () => {
      function fetch(){
        read({
          api: true,
        })
      }
      fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page]
  )

  const data = entities && entities.length > 0 ? entities.map(product => ({
    key: product.id,
    codebarre: product.codebarre,
    segment: product.segment,
    type: product.type && product.type.name,
    "Catégorie": product.category ? product.category.name : product.cat,
    marque: product.brand ? product.brand.name : product.marque,
    couleur: product.couleur,
    taille: product.taille,
    "PU": product.pu,
    "CAA": product.caa,
    "PV": product.pv,
    "Code Livraison": product.delivery && product.delivery.name,
    "Source": product.source,
  })) : [{
    key: null,
    codebarre: null,
    segment: null,
    type: null,
    "Catégorie": null,
    marque: null,
    couleur: null,
    taille: null,
    "PU": null,
    "CAA": null,
    "PV": null,
    "Code Livraison": null,
    "Source": null,
  }]

  return (
    <Table
      data={data}
      loading={(status && status.isFetching) || false}
      pager={props.pagination}
      page={props.page} setPage={props.setPage}
    />
  )
}

export default TableComponent
