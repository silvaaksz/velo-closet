export function Testimonials() {
  return (
    <section style={{ padding: "40px 20px", background: "#f1f1f1" }}>
      <h2>Depoimentos</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        <div style={{ background: "white", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "250px" }}>
          <p>"Economizei muito na minha primeira compra!"</p>
          <strong>- Fernanda Assis</strong>
        </div>
        <div style={{ background: "white", padding: "15px", borderRadius: "8px", flex: "1", minWidth: "250px" }}>
          <p>"Cadastrei meu ateliê e triplicamos as vendas."</p>
          <strong>- Ricardo Melo</strong>
        </div>
      </div>
    </section>
  );
}