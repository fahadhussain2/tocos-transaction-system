import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(import.meta.env.VITE_API_URL + "/users/" + id);
      const fetchedUser = await res.json();
      setUser(fetchedUser);
    };
    getUser();
  }, []);
  if (user)
    return (
      <div
        style={{
          maxWidth: 300,
          margin: "0 auto",
        }}
      >
        <Typography.Title style={{ textAlign: "center" }} level={1}>
          User Details
        </Typography.Title>

        <Typography.Title style={{ textAlign: "center" }} level={5}>
          First Name : {user.firstName}
        </Typography.Title>

        <Typography.Title style={{ textAlign: "center" }} level={5}>
          First Name : {user.lastName}
        </Typography.Title>

        <Typography.Title style={{ textAlign: "center" }} level={5}>
          Balance : {user.balance} tocos
        </Typography.Title>

        <Typography.Title style={{ textAlign: "center" }} level={5}>
          Created Date : {new Date(user.createdAt).toLocaleDateString()}
        </Typography.Title>

        <Typography.Title style={{ textAlign: "center" }} level={3}>
          Transactions
        </Typography.Title>

        {user.transactions &&
          user.transactions.map((transaction) => {
            return (
              <Typography.Paragraph
                key={transaction._id}
                style={{ textAlign: "center", border: "1px solid gray" }}
              >
                Amount: {transaction.amount} Tocos | Date:{" "}
                {new Date(transaction.createdAt).toLocaleDateString()}
              </Typography.Paragraph>
            );
          })}
      </div>
    );
};

export default UserDetails;
