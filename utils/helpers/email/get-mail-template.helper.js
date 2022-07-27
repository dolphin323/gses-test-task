const getMailTemplate = {
  currentRate: (currentRate) => ({
    html: `<p>Поточний курс BTC до UAH <strong>${currentRate}</strong></p>`,
    subject: "Поточний курс BTC до UAH",
  }),
};

export { getMailTemplate };
