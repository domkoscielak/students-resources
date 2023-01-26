export const Button = ({ selected = false, children, ...rest }) => {
  return (
    <button className={selected ? "button--selected" : ""} {...rest}>
      {children}
    </button>
  );
};
