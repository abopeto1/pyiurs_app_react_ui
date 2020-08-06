export const reduceType = arr => {
    return arr.reduce((aa, ii) => {
        return ii.products.reduce((aaa, iii, index) => {
            const product = iii.bill_details.find(bd => !bd.rs)
            
            return product ? aaa + parseFloat(product.net) : aaa
        }, 0) + aa
    }, 0)
}

export const getUniqueBillsSegment = segment => {
    const segment_bills = segment.types.reduce((aa, ii) => {
        const products_bill = ii.products.reduce((b, j) => {
            const bill_detail_bill = j.bill_details.find(bd => !bd.rs)
            const id = bill_detail_bill ? bill_detail_bill.bill.id : null
            return id ? [...b, id] : b
        }, [])
        return [...aa, ...products_bill]
    }, [])

    return segment_bills
}

export const getUniqueBillsTypes = type => {
    const products_bill = type.products.reduce((b, j) => {
        const bill_detail_bill = j.bill_details.find(bd => !bd.rs)
        const id = bill_detail_bill ? bill_detail_bill.bill.id : null
        return id ? [...b, id] : b
    }, [])
    return products_bill
}