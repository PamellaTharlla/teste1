
import app from './app';
import AppDataSource from './config/database';

const PORT = 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conectado no Banco');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o Data Source:', error);
  }
};
 
startServer();