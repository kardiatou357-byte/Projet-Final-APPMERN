import { useToast } from "../context/ToastContext";

const icons = {
  success: "bi-check-circle-fill",
  error: "bi-x-circle-fill",
  info: "bi-info-circle-fill",
  warning: "bi-exclamation-triangle-fill",
};

const colors = {
  success: "#10b981",
  error: "#ef4444",
  info: "#3b82f6",
  warning: "#f59e0b",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-item"
          style={{ borderLeft: `5px solid ${colors[t.type]}` }}
          onClick={() => removeToast(t.id)}
        >
          <i
            className={`bi ${icons[t.type]} me-2`}
            style={{ color: colors[t.type], fontSize: "1.2rem" }}
          ></i>
          <span className="flex-grow-1">{t.message}</span>
          <i className="bi bi-x ms-2" style={{ cursor: "pointer" }}></i>
        </div>
      ))}
    </div>
  );
}