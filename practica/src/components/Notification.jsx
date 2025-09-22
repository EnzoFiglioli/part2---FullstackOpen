export const Notification = ({ message,messageStyle }) => {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0000001c",
      }}
    >
      <section
        style={{
          backgroundColor: messageStyle,
          color: "black",
          padding: "1rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          maxWidth: "400px",
          textAlign: "center",
        }}
        role="alert"
      >
        <h3>{message}</h3>
      </section>
    </main>
  );
};
