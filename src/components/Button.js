export default function Button({children, func}) {
    return (
        <button onClick={func}>{children}</button>
    );
};

