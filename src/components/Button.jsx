// A reusable button component with customizable appearance
function Button({ onClick, children, variant = "primary", disabled = false, style = {}, ...rest }) {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: "#6c757d", color: "white" };
      case "success":
        return { backgroundColor: "#28a745", color: "white" };
      case "danger":
        return { backgroundColor: "#dc3545", color: "white" };
      case "primary":
      default:
        return { backgroundColor: "#007bff", color: "white" };
    }
  };

  const baseStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.7 : 1,
    ...getButtonStyle(),
    ...style
  };

  return (
    <button
      style={baseStyle}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
