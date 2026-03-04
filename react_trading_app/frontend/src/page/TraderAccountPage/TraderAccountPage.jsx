import React, { useEffect, useState } from "react"
import "./TraderAccountPage.scss"
import {
  traderAccountUrl,
  withdrawFundsUrl,
  depositFundsUrl,
} from "../../util/constants"
import { Input, Modal, Button } from "antd"
import { useParams } from "react-router-dom"
import NavBar from "../../component/NavBar/NavBar"
import axios from "axios"

function TraderAccountPage() {

  const routeParams = useParams()

  const [state, setState] = useState({
    trader: {},
    traderId: null,
    isDepositModalVisible: false,
    isWithdrawModalVisible: false,
    depositFunds: null,
    withdrawFunds: null,
  })

  const fetchTrader = async (traderId) => {
    const response = await axios.get(traderAccountUrl + traderId)
    if (response) {
      setState(prev => ({
        ...prev,
        trader: response.data,
      }))
    }
  }

  useEffect(() => {
    if (routeParams?.traderId) {
      const traderId = routeParams.traderId
      setState(prev => ({
        ...prev,
        traderId
      }))
      fetchTrader(traderId)
    }
  }, [])

  const showDepositModal = () => {
    setState(prev => ({
      ...prev,
      isDepositModalVisible: true
    }))
  }

  const showWithdrawModal = () => {
    setState(prev => ({
      ...prev,
      isWithdrawModalVisible: true
    }))
  }

  const handleDepositCancel = () => {
    setState(prev => ({
      ...prev,
      isDepositModalVisible: false,
      depositFunds: null
    }))
  }

  const handleWithdrawCancel = () => {
    setState(prev => ({
      ...prev,
      isWithdrawModalVisible: false,
      withdrawFunds: null
    }))
  }

  const handleDepositOk = async () => {
    const url =
      depositFundsUrl +
      state.traderId +
      "/amount/" +
      state.depositFunds

    await axios.put(url)
    await fetchTrader(state.traderId)

    setState(prev => ({
      ...prev,
      isDepositModalVisible: false
    }))
  }

  const handleWithdrawOk = async () => {
    const url =
      withdrawFundsUrl +
      state.traderId +
      "/amount/" +
      state.withdrawFunds

    await axios.put(url)
    await fetchTrader(state.traderId)

    setState(prev => ({
      ...prev,
      isWithdrawModalVisible: false
    }))
  }

  const onInputChange = (field, value) => {
    setState(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="trader-account-page">
      <NavBar />

      <div className="trader-account-page-content">
        <div className="title">Trader Account</div>

        <div className="trader-cards">

          <div className="trader-card">
            <div className="info-row">
              <div className="field">
                <div className="content-heading">First Name</div>
                <div className="content">{state.trader.firstName}</div>
              </div>
              <div className="field">
                <div className="content-heading">Last Name</div>
                <div className="content">{state.trader.lastName}</div>
              </div>
            </div>

            <div className="info-row">
              <div className="field">
                <div className="content-heading">Email</div>
                <div className="content">{state.trader.email}</div>
              </div>
            </div>

            <div className="info-row">
              <div className="field">
                <div className="content-heading">Date of Birth</div>
                <div className="content">{state.trader.dob}</div>
              </div>
              <div className="field">
                <div className="content-heading">Country</div>
                <div className="content">{state.trader.country}</div>
              </div>
            </div>
          </div>

          <div className="trader-card">
            <div className="info-row">
              <div className="field">
                <div className="content-heading amount">Amount</div>
                <div className="content amount">
                  {state.trader.amount || 0}$
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <Button onClick={showDepositModal}>Deposit Funds</Button>
            <Button onClick={showWithdrawModal}>Withdraw Funds</Button>

            <Modal
              title="Deposit Funds"
              open={state.isDepositModalVisible}
              onOk={handleDepositOk}
              onCancel={handleDepositCancel}
            >
              <Input
                placeholder="Amount"
                onChange={(e) =>
                  onInputChange("depositFunds", e.target.value)
                }
              />
            </Modal>

            <Modal
              title="Withdraw Funds"
              open={state.isWithdrawModalVisible}
              onOk={handleWithdrawOk}
              onCancel={handleWithdrawCancel}
            >
              <Input
                placeholder="Amount"
                onChange={(e) =>
                  onInputChange("withdrawFunds", e.target.value)
                }
              />
            </Modal>

          </div>

        </div>
      </div>
    </div>
  )
}

export default TraderAccountPage
