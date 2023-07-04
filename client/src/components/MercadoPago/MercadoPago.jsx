import React from 'react';
import { Wallet } from '@mercadopago/sdk-react';

const MercadoPago = ({ preferenceId }) => {

  return (
    <div>  
      <Wallet initialization={{ preferenceId }} />
    </div>
  )
}

export default MercadoPago