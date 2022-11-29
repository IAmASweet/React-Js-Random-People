import { useEffect, useState } from "react";
import Button from "./components/Button";
import ListUsers from "./components/Users";
import { textForBtns } from "./constants/constants";

export default function App() {
  const [addBtn, doubleBtn, showMillionairesBtn, sortBtn, sumBtn, deleteUsersBtn] = textForBtns
  const [users, setUser] = useState([]);
  const [sumMoney, setSumMoney] = useState();
  const [stateUsers, setStateAdd] = useState(true);

  const fetchUser = async () => {
    if (stateUsers) {
      const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const userResult = data.results[0];
    const newUser = {
      name: `${userResult.name.first} ${userResult.name.last}`,
      money: Math.floor(Math.random() * 1000000)
    };
    setUser((user) => {
      return [...user, newUser];
    });
    } else {
      alert('You added too many users. Please click Delete Users');
    }
  };

  useEffect(() => {
    console.log('hi!')
    fetchUser();
    fetchUser();
    fetchUser();
  }, []);

  useEffect(() => {
    console.log('always')
    if (users.length > 10) {
      setStateAdd(false);
    } else {
      setStateAdd(true);
    }
  })
  
  const showMillionaires = () => {
    const millionairesUsers = users.filter((user) => user.money > 1000000);
    setUser(millionairesUsers);
    setSumMoney();
  };
  
  const sortByRichest = () => {
    const richestUsers = [...users.sort((a, b) => b.money - a.money)];
    setUser(richestUsers);
    setSumMoney();
  }

  const calculateSum = () => {
    const sum = users.reduce((a, b) => a + b.money, 0);
    setSumMoney(sum);
  };

  const doubleMoney = () => {
    const mapUsers = users.map((user) => {
      return {name: user.name, money: user.money * 2};
    });
    setUser(mapUsers);
    setSumMoney();
  };

  const deleteUsers = () => {
    setUser([]);
    setSumMoney();
  };

  return (
    <>
    <aside>
    <Button func={fetchUser}>{addBtn}</Button>
    <Button func={doubleMoney}>{doubleBtn}</Button>
    <Button func={showMillionaires}>{showMillionairesBtn}</Button>
    <Button func={sortByRichest}>{sortBtn}</Button>
    <Button func={calculateSum}>{sumBtn}</Button> 
    <Button func={deleteUsers}>{deleteUsersBtn}</Button> 
    </aside>
    <ListUsers sumMoney={sumMoney}>{users}</ListUsers>
    </>
  );
}

