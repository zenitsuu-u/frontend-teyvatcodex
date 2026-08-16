export default function ToastContainer({ toasts }: any) {
    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            {toasts.map((toast: any) => (
                <div
                    key={toast.id}
                    style={{
                        padding: "14px 20px",
                        borderRadius: "10px",
                        background: toast.type === "success" ? "#059669" : "#dc2626",
                        color: "white",
                        fontFamily: "Cinzel, serif",
                        fontWeight: 600,
                        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                        animation: "fadeIn 0.3s ease",
                    }}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}