export default function ListUsers({children, sumMoney}) {
    return (
        <main className="users">
            <h2><strong>Person</strong> Money</h2>
            <div className="users-block">
                {children.map((user) => <h3 key={user.name}><strong>{user.name}</strong> {user.money} $</h3>)}
            </div>
            {sumMoney ? <h2 className="total-wealth">Total Wealth <strong>{sumMoney} $</strong></h2>: null}
        </main>
    );
};

