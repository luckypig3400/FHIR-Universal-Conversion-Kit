const express = require('express');
// const { Convert, Validator } = require('@fhir-uck/fhir-converter-core');
const { Convert, Validator } = require('./index.js');

const app = express();
app.use(express.json());

app.post('/api/convert', async (req, res) => {
  const { config, data, validate } = req.body;

  try {
    const convert = new Convert(config);
    const result = await convert.convert(data);

    if (validate) {
      const validator = new Validator();
      const validationResult = await validator.validate(result);
      res.json({ result, validationResult });
    } else {
      res.json({ result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));