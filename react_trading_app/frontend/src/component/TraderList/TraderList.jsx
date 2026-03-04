
import { Table } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTrashAlt as deleteIcon,
  faUser as viewIcon
} from '@fortawesome/free-solid-svg-icons'
import './TraderList.scss'
import { useNavigate } from 'react-router-dom'

function TraderList({ traders, onTraderDeleteClick }) {

  const navigate = useNavigate()

  const columns = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    {
      title: 'Actions',
      key: 'actions',
render: (_, record) => (
  <div className="trader-actions" onClick={(e) => e.stopPropagation()}>
    <span
      className="view-icon"
      onClick={(e) => {
        e.stopPropagation()
        navigate(`/trader/${record.id}`)
      }}
    >
      <FontAwesomeIcon icon={viewIcon} />
    </span>

    <span
      className="delete-icon"
      onClick={(e) => {
        e.stopPropagation()
        onTraderDeleteClick(record.id)
      }}
    >
      <FontAwesomeIcon icon={deleteIcon} />
    </span>
  </div>
),


    },
  ]

  return (
    <Table
      dataSource={traders}
      columns={columns}
      pagination={false}
      rowKey="id"
    />
  )
}

export default TraderList
