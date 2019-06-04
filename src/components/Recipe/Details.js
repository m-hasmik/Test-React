// @flow
import React from 'react'

import SubHeader from '../common/SubHeader'
import Paragraph from '../common/Paragraph'

type Props = {
  cost: number,
  currency: string,
  grossProfitMargin: string,
  price: number
}

const Details = ({ currency, grossProfitMargin, cost, price }: Props) => (
  <React.Fragment>
    <hr />
    <SubHeader>Details:</SubHeader>
    {grossProfitMargin && <Paragraph>Margin: {grossProfitMargin}</Paragraph>}
    {cost && (
      <Paragraph>
        Estimated Cost: {currency} {cost}
      </Paragraph>
    )}
    {price && (
      <Paragraph>
        Recommended Selling Price: {currency} {price}
      </Paragraph>
    )}
  </React.Fragment>
)

export default Details
