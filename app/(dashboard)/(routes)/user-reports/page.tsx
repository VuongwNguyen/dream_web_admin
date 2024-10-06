'use client';
import React, { useState } from "react";
import "./OverviewTable.css"; // Assuming your CSS is in this file

interface User {
  id: number;
  name: string;
  follows: string;
  email: string;
  createdDate: string;
}

const UserReportPage: React.FC = () => {
  // Sample data
  const data: User[] = [
    {
      id: 1,
      name: "Nicholas Patrick",
      follows: "2540.58 Follows",
      email: "abc@gmail.com",
      createdDate: "02/12/2010",
    },
    {
      id: 2,
      name: "Cordell Edwards",
      follows: "1567.80 Follows",
      email: "abc@gmail.com",
      createdDate: "03/10/2012",
    },
    // Add more rows as needed...
  ];

  // State to control modal visibility and selected user
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleViewClick = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="overview-table-container">
      <h2>Top Featured Users</h2>
      <table className="overview-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Reporter</th>
            <th>Repoerted Person</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.follows}</td>
              <td>{user.email}</td>
              <td>
                <button className="action-btn" onClick={() => handleViewClick(user)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="page-btn">{"<<"}</button>
        <button className="page-btn">5</button>
        <button className="page-btn">6</button>
        <button className="page-btn">7</button>
        <button className="page-btn">{">>"}</button>
      </div>

      {/* Modal */}
      {isModalVisible && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Title of report</h3>
            <div className="report-info">
              <div>
                <strong>Reporter</strong>: Id: {selectedUser.id} Email: {selectedUser.email}
              </div>
              <div>
                <strong>Reported person</strong>: Id: {selectedUser.id} Email: {selectedUser.email}
              </div>
            </div>
            <div className="report-details">
              <textarea readOnly value="Report details go here..." />
            </div>
            <div className="modal-actions">
              <button className="warn-btn">Warn</button>
              <button className="confirm-btn">Confirm</button>
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReportPage;
