import express, { Request, Response } from 'express';
import alimentosServices from '../services/alimentosServices';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const newAlimento = await alimentosServices.create(req.body);
    res.status(201).json(newAlimento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar o alimento' });
  }
});

router.get('/nome/:nome', async (req: Request, res: Response) => {
  try {
    const nome = req.params.nome;
    const alimentos = await alimentosServices.getByName(nome);
    
    if (alimentos.length === 0) {
      res.status(404).json({ error: 'Alimentos não encontrados com esse nome' });
      return;
    }
    
    res.status(200).json(alimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os alimentos' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const alimentos = await alimentosServices.getAll();
    res.status(200).json(alimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os alimentos' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const alimento = await alimentosServices.getById(Number(req.params.id));
    
    if (!alimento) {
      res.status(404).json({ error: 'Alimento não encontrado' });
      return;
    }
    
    res.status(200).json(alimento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o alimento' });
  }
});

router.get('/buscar/:id/:nome', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const nome = req.params.nome;
    const alimentos = await alimentosServices.getByIdAndName(id, nome);
    
    if (alimentos.length === 0) {
      res.status(404).json({ error: 'Alimentos não encontrados com esse ID e Nome' });
      return;
    }
    
    res.status(200).json(alimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os alimentos' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedAlimento = await alimentosServices.update(Number(req.params.id), req.body);
    
    if (!updatedAlimento) {
      res.status(404).json({ error: 'Alimento não encontrado' });
      return;
    }
    
    res.status(200).json(updatedAlimento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar o alimento' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await alimentosServices.delete(Number(req.params.id));
    
    if (!success) {
      res.status(404).json({ error: 'Alimento não encontrado' });
      return;
    }
    
    res.status(200).json({ message: 'Alimento deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar o alimento' });
  }
});

export default router;