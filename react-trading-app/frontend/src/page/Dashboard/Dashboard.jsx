

import React, { useEffect, useState } from 'react'
import './Dashboard.scss'
import NavBar from '../../component/NavBar/NavBar'
import TraderList from '../../component/TraderList/TraderList'

import { Input, DatePicker, Modal, Button, Form } from 'antd'
import axios from 'axios'
import { tradersUrl, createTraderUrl, deleteTraderUrl } from '../../util/constants'

function Dashboard() {
  const [form] = Form.useForm()

  const [state, setState] = useState({
    isModalVisible: false,
    traders: [],
  })

  const getTraders = async () => {
    try {
      const response = await axios.get(tradersUrl)
      setState((prev) => ({
        ...prev,
        traders: response.data || [],
      }))
    } catch (err) {
      console.log('GET traders failed:', err)
    }
  }

  useEffect(() => {
    getTraders()
  }, [])

  const showModal = () => {
    setState((prev) => ({
      ...prev,
      isModalVisible: true,
    }))
  }

  const handleCancel = () => {
    setState((prev) => ({
      ...prev,
      isModalVisible: false,
    }))
    form.resetFields()
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        country: values.country,
        dob: values.dob.format('YYYY-MM-DD'),
      }

      await axios.post(createTraderUrl, payload)

      await getTraders()

      setState((prev) => ({
        ...prev,
        isModalVisible: false,
      }))

      form.resetFields()
    } catch (err) {
      console.log('Add trader failed:', err)
    }
  }

const onTraderDelete = async (id) => {
  try {
    await axios.delete(deleteTraderUrl + id)
    await getTraders()
  } catch (error) {
    console.error("Delete trader failed:", error)
  }
}

  return (
    <div className="dashboard">
      <NavBar />

      <div className="dashboard-content">
        <div className="title">
          Dashboard

          <div className="add-trader-button">
            <Button onClick={showModal}>Add New Trader</Button>

            <Modal
              title="Add New Trader"
              okText="Submit"
              open={state.isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form form={form} layout="vertical">
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'First Name is required' }]}
                >
                  <Input placeholder="John" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Last Name is required' }]}
                >
                  <Input placeholder="Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Email is required' },
                    {
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter valid email',
                    },
                  ]}
                >
                  <Input placeholder="john@test.com" />
                </Form.Item>

                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: 'Country is required' }]}
                >
                  <Input placeholder="Canada" />
                </Form.Item>

                <Form.Item
                  name="dob"
                  label="Date of Birth"
                  rules={[{ required: true, message: 'Date of Birth is required' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>

        <TraderList traders={state.traders} onTraderDeleteClick={onTraderDelete} />
      </div>
    </div>
  )
}

export default Dashboard
