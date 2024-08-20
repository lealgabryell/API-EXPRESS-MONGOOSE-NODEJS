import express from 'express';
import mongoose from 'mongoose';
import { Product } from './models/products.js';


const app = express();
const port = 3300;


mongoose.connect('mongodb://localhost:27017/minha-api');

const db = mongoose.connection;

//eventos de erro
db.on('error', console.error.bind(console, 'connection error:'));

//eventos de sucesso
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

//Receber requisicoes HTTP e retornar respostas 

//Suporte ao JSON do Express
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando corretamente!');
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

app.get(('/products'), (req, res) => {
  Product.find((err, product) => {
    if (err)
      return res.status(500).send(err);
    res.send(product);
  });
});

app.get(('/products/:id'), (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err)
      return res.status(500).send(err);
    if (!product)
      return res.status(404).send('Produto nao encontrado')
    res.send(product);
  });
});

app.post(('/products'), (req, res) => {
  const product = new Product(req.body);
  product.save(err, req.params.body)
});

app.put(('/products/:id'), (req, res) => {
  Product.findByIdAndUpdate(req.params.id, (err, product) => {
    if (err)
      return res.status(500).send(err)
    if (!product)
      return res.status(404).send()

    res.send(product);
  });
});

app.delete(('/products/:id'), (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err)
      return res.status(500).send(err)
    if (!product)
      return res.status(404).send()
    res.send(product);
  });
});