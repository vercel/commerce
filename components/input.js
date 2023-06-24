export function Option({ children, ...props }) {
    return <option {...props}>{children}</option>;
}

export function Select({ id, label, children, ...props }) {
    return (
        <div>
            <select name={label} id={id} {...props}>
                {children}
            </select>
            {/* TODO: parentheses around label w/ css */}
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export function NumberInput({ id, label, ...props }) {
    return (
        <div>
            <input {...props} type='number' id={id} name={label} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}
