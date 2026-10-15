const whyUs = [
  { id: 1, heading: 'Roasted Weekly', message: 'We roast in small batches every Monday' },
  {
    id: 2,
    heading: 'Local pastries',
    message: "Baked each morning by Orland's Maple Street Bakery",
  },
  { id: 3, heading: 'Dog friendly', message: 'Well-behaved pups welcome on the patio' },
]

export const WhyUsCards = () => {
  return (
    <section className="why-grid" aria-label="Why choose us">
      {whyUs.map((item) => (
        <article key={item.id} className="why-card">
          <h2>{item.heading}</h2>
          <p>{item.message}</p>
        </article>
      ))}
    </section>
  )
}
