import React, { useEffect, useState } from 'react'
import './QuotePage.scss'
import NavBar from '../../component/NavBar/NavBar'
import { Table } from 'antd'

function QuotePage() {

  const [state, setState] = useState({
    quotes: []
  })

useEffect(() => {
  setState({
    quotes: [
      {
        key: 1,
        ticker: 'FB',
        lastPrice: 319.48,
        bidPrice: 0,
        bidSize: 0,
        askPrice: 13,
        askSize: 400,
      },
      {
        key: 2,
        ticker: 'AAPL',
        lastPrice: 0,
        bidPrice: 0,
        bidSize: 0,
        askPrice: 13,
        askSize: 400,
      },
    ],
  })
}, [])


const columns = [
  {
    title: 'Ticker',
    dataIndex: 'ticker',
    key: 'ticker',
  },
  {
    title: 'Last Price',
    dataIndex: 'lastPrice',
    key: 'lastPrice',
  },
  {
    title: 'Bid Price',
    dataIndex: 'bidPrice',
    key: 'bidPrice',
  },
  {
    title: 'Bid Size',
    dataIndex: 'bidSize',
    key: 'bidSize',
  },
  {
    title: 'Ask Price',
    dataIndex: 'askPrice',
    key: 'askPrice',
  },
  {
    title: 'Ask Size',
    dataIndex: 'askSize',
    key: 'askSize',
  },
]


  return (
    <div className="quote-page">
      <NavBar />

      <div className="quote-page-content">
        <div className="title">Quotes</div>

        <Table
          dataSource={state.quotes}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default QuotePage
