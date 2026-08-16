type BuildFieldProps = {
    label: string;
    value: string | number;
};

export default function BuildField({ label, value }: BuildFieldProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 14px",
                marginBottom: "10px",
                background: "#1e293b",
                borderRadius: "10px",
                fontSize: "15px",
                lineHeight: "20px"
            }}
        >
            <span
                style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: "#e2c97e",
                    fontSize: "0.95rem"
                }}
            >
                {label}
            </span>

            <span
                style={{
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #e2c97e, #f0e2b0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                {value}
            </span>
        </div>
    );
}